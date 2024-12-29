import { useParams } from "react-router-dom";
import { useGetSinglePlanQuery } from "../../../redux/features/plans/planApi";
import nagadLogo from "../../../assets/payment/nagad.png";
import bankLogo from "../../../assets/payment/dutch.png";
import BkashPayment from "../../../components/Plans/BkashPayment/BkashPayment";

const SinglePlan = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSinglePlanQuery(id, { skip: !id });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-100">
        <span className="text-pink-500 font-semibold text-lg">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Failed to load plan details. Please try again.
      </div>
    );
  }

  const plan = data?.data;

  return (
    <div className="px-6 py-10 bg-pink-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-pink-100">
        <h1 className="text-4xl font-bold mb-4 text-pink-600 capitalize text-center">
          {plan?.plan_name} Plan
        </h1>
        <p className="text-gray-600 mb-6 text-center italic">
          {plan?.description}
        </p>

        <div className="mb-6">
          <p className="text-lg font-medium text-pink-500">Features:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {plan?.features?.split(". ").map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium text-pink-500">Limitations:</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {plan?.limitations?.split(". ").map((limitation, index) => (
              <li key={index}>{limitation}</li>
            ))}
          </ul>
        </div>

        <p className="text-lg text-gray-700 mb-2">
          <strong>Price:</strong>{" "}
          <span className="text-pink-600 font-semibold">
            {plan?.currency} {plan?.price}
          </span>
          /{plan?.duration}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>User Limit:</strong> {plan?.user_limit}
        </p>

        <h2 className="text-3xl font-bold mt-6 mb-6 text-pink-600 text-center">
          Payment Methods
        </h2>
        <div className="space-y-4">
          <BkashPayment id={id} price={plan?.price} />
          <button className="w-full flex items-center justify-center gap-4 py-3 bg-white text-orange-500 rounded-lg shadow-lg hover:bg-orange-100 transition border border-orange-500">
            <img src={nagadLogo} alt="Nagad" className="h-8" />
            Pay with Nagad
          </button>
          <button className="w-full flex items-center justify-center gap-4 py-3 bg-white text-blue-500 rounded-lg shadow-lg hover:bg-blue-100 transition border border-blue-500">
            <img src={bankLogo} alt="Bank Transfer" className="h-8" />
            Pay with Bank Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePlan;
