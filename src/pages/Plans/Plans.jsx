import { useNavigate } from "react-router-dom";
import { useGetPlansQuery } from "../../redux/features/plans/planApi";

const Plans = () => {
  const { data, error, isLoading } = useGetPlansQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50">
        <span className="text-pink-500 font-semibold text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50 text-red-500">
        {error?.data?.message || error?.message}
      </div>
    );
  }

  return (
    <div className="px-6 py-10 bg-pink-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-pink-600">
        Subscription Plans
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data?.map((plan) => (
          <div
            key={plan?.plan_id}
            className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-pink-500 hover:border-pink-600 transition duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 capitalize">
              {plan?.plan_name}
            </h2>
            <p className="text-gray-600 mb-4">{plan?.description}</p>
            <div className="mb-4">
              <p className="text-sm text-pink-400 font-semibold">Features:</p>
              <ul className="text-sm text-gray-700 list-disc pl-5">
                {plan?.features?.split(". ")?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm text-pink-400 font-semibold">
                Limitations:
              </p>
              <ul className="text-sm text-gray-700 list-disc pl-5">
                {plan?.limitations?.split(". ")?.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </div>
            <p className="text-gray-800 font-medium mb-2">
              Price:{" "}
              <span className="text-pink-600 font-bold">
                {plan?.currency} {plan?.price}
              </span>
              /{plan?.duration}
            </p>
            <p className="text-gray-800 font-medium">
              User Limit:{" "}
              <span className="text-pink-600 font-bold">
                {plan?.user_limit}
              </span>
            </p>
            <button
              onClick={() => navigate(plan?._id)}
              className="w-full mt-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
