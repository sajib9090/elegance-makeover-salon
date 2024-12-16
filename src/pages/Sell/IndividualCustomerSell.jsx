import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";
import CurrencyFormatter from "../../components/CurrencyFormatter/CurrencyFormatter";
import { toast } from "sonner";
import {
  useAddNewTempOrderLogMutation,
  useGetSingleTempOrderLogQuery,
} from "../../redux/features/tempOrderLog/tempOrderLogApi";
import DetailsIndividualSell from "../../components/Sell/DetailsIndividualSell/DetailsIndividualSell";
import DeleteTempCustomer from "../../components/Sell/DeleteTempCustomer/DeleteTempCustomer";
import { useGetTempCustomerByIdQuery } from "../../redux/features/tempCustomer/tempCustomer";

const IndividualCustomerSell = () => {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState("");
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const { data, isLoading } = useGetAllServicesQuery({
    searchValue: "",
    limitValue: "",
    pageValue: "",
    sortPrice: "",
    category: "",
  });

  const { data: customerInfo } = useGetTempCustomerByIdQuery(id, { skip: !id });

  // Fetch all services and set states
  useEffect(() => {
    if (data?.data) {
      setAllServices(data.data);
      setFilteredServices(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredServices(allServices);
    } else {
      const filtered = allServices.filter((service) =>
        service?.service_name?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchValue, allServices]);

  // Group services by category
  const groupedServices = filteredServices?.reduce((acc, item) => {
    const category = item?.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category]?.push(item);
    return acc;
  }, {});

  const [addNewTempOrderLog, { isLoading: addLoading }] =
    useAddNewTempOrderLogMutation();

  const {
    data: tempOrderLog,
    isLoading: tempOrderLoading,
    refetch: refetchTempOrderLog,
  } = useGetSingleTempOrderLogQuery(
    { tempCustomerId: id?.split("+")[0] },
    { skip: !id?.split("+")[0] }
  );

  // Create a set of service_ids from tempOrderLog for quick lookup
  const bookedServiceIds = new Set(
    tempOrderLog?.data?.map((log) => log.service_id) || []
  );

  const totalQuantity = tempOrderLog?.data?.reduce(
    (acc, log) => acc + (log.quantity || 0),
    0
  );

  const handleBooking = async (item) => {
    const data = {
      temp_customer_id: id?.split("+")[0],
      service_id: item?.service_id,
    };

    try {
      const response = await addNewTempOrderLog(data).unwrap();
      if (response?.success) {
        toast.success(response?.message || response?.data?.message);

        refetchTempOrderLog();
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div className="py-6 px-4">
      <DeleteTempCustomer
        tempCustomerId={customerInfo?.data?.temp_customer_id}
      />

      <DetailsIndividualSell
        customer={customerInfo?.data}
        totalQuantity={totalQuantity}
        carts={tempOrderLog}
      />
      {/* Search Bar */}
      <div className="search mb-6">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full p-3 rounded-lg border border-pink-300 focus:ring-pink-400 focus:border-pink-400"
          type="search"
          placeholder="Search services..."
        />
      </div>

      {/* Categories and Services */}
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : Object?.keys(groupedServices)?.length ? (
        Object?.entries(groupedServices)?.map(([category, services]) => (
          <div key={category} className="mb-6">
            {/* Category Title */}
            <h2 className="text-lg font-bold text-pink-600 mb-3 border-b border-pink-300 pb-1 capitalize bg-gradient-to-b from-pink-50 to-white">
              {category}
            </h2>

            {/* Service Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {services?.map((service) => (
                <div
                  key={service?._id}
                  className="border rounded-lg p-2 shadow-md bg-white hover:bg-pink-100 hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-center h-full cursor-pointer"
                >
                  {/* Service Content */}
                  <div>
                    {/* Service Name */}
                    <h3 className="text-sm font-medium text-pink-700 mb-2 capitalize">
                      {service?.service_name}
                    </h3>
                  </div>

                  {/* Price and Book Button */}
                  <div className="mt-auto">
                    {/* Price */}
                    <p className="text-gray-700 text-sm my-2 flex items-center gap-2 justify-center">
                      <span className="font-bold">Price:</span>
                      <span>
                        <CurrencyFormatter value={service?.price} />
                      </span>
                    </p>

                    {/* Book Button */}
                    <button
                      disabled={
                        addLoading ||
                        tempOrderLoading ||
                        bookedServiceIds?.has(service?.service_id)
                      }
                      onClick={() => handleBooking(service)}
                      className={`w-full text-xs ${
                        bookedServiceIds?.has(service?.service_id)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-pink-500 text-white hover:bg-pink-600"
                      } px-3 py-1 rounded transition`}
                    >
                      {bookedServiceIds?.has(service?.service_id)
                        ? "Booked"
                        : addLoading
                        ? "Please wait.."
                        : "Book Now"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No services found.</p>
      )}
    </div>
  );
};

export default IndividualCustomerSell;
