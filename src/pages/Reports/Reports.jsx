import { FaSellsy } from "react-icons/fa6";
import DashboardBox from "../../components/DashboardBox/DashboardBox";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useGetAllSoldInvoicesByDateQuery } from "../../redux/features/soldInvoice/soldInvoiceApi";
import CurrencyFormatter from "../../components/CurrencyFormatter/CurrencyFormatter";

const Reports = () => {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];

  const { data: dateWiseData, isLoading: dateWiseLoading } =
    useGetAllSoldInvoicesByDateQuery(
      { date: formattedDate },
      { skip: !formattedDate }
    );

  let totalBillSumByDate = 0;

  // Calculate total bill sum if data is available
  if (dateWiseData?.data?.length) {
    totalBillSumByDate = dateWiseData?.data?.reduce(
      (sum, invoice) => sum + (invoice?.total_bill || 0),
      0
    );
  }

  return (
    <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardBox
        borderColor={"border-sky-300"}
        backGroundColor={"bg-sky-200"}
        logo={<FaSellsy />}
        logoColor={"text-sky-600"}
        link={`/reports/query?date=${formattedDate}`}
        quantity={
          dateWiseLoading
            ? "Please wait..."
            : <CurrencyFormatter value={totalBillSumByDate} /> || "00"
        }
        title={"Today's Sales"}
      />
      <DashboardBox
        borderColor={"border-purple-300"}
        backGroundColor={"bg-purple-200"}
        logo={<MdOutlineCalendarMonth />}
        logoColor={"text-purple-600"}
        link={"details-report"}
        quantity={"Details"}
        title={"Details Sales & Expenses"}
      />
    </div>
  );
};

export default Reports;
