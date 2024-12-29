import { useState } from "react";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import FullPageLoader from "../../../components/FullPageLoader/FullPageLoader";
import {
  useGetPaymentsQuery,
  useIncreaseSubscriptionMutation,
  useRejectSubscriptionMutation,
} from "../../../redux/features/payment/paymentApi";
import Modal from "../../../components/Modal/Modal";
import { toast } from "sonner";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";
import { useSelector } from "react-redux";
import { currentUser } from "../../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Payment = () => {
  const user = useSelector(currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [days, setDays] = useState("");
  const { data, error, isLoading } = useGetPaymentsQuery();

  console.log(data);
  const [increaseSubscription, { isLoading: updateLoading }] =
    useIncreaseSubscriptionMutation();
  const [rejectSubscription, { isLoading: rejectLoading }] =
    useRejectSubscriptionMutation();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-red-500">
        Error fetching payments: {error?.message}
      </div>
    );
  }

  const payments = data?.data || [];

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setIsOpen(true);
    setIsDone(false);
  };

  const handleDone = () => {
    setIsDone(true);
  };

  const handleSubmitDone = async () => {
    const data = {
      transactionId: selectedPayment?.transaction_id,
      days,
    };

    if (days) {
      try {
        const res = await increaseSubscription(data).unwrap();
        toast.success(res?.data?.message || res?.message);
        setIsOpen(false);
      } catch (error) {
        toast.error(error?.message || error?.data?.message);
      }
    }
  };

  const handleReject = async () => {
    const data = {
      transactionId: selectedPayment?.transaction_id,
      declinedReason: explanation,
    };

    try {
      const response = await rejectSubscription(data).unwrap();
      if (response?.success) {
        toast.success(response?.message || response?.data?.message);
        setIsOpen(false);
        setExplanation("");
        setIsRejecting(false);
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-6">
        <div className="border rounded-lg shadow-md bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-4 mb-4">
          <h2 className="text-lg font-bold text-center mb-3 text-rose-600">
            💎 Subscription Info 💎
          </h2>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="bg-white rounded-md shadow-sm p-3 border border-rose-200 text-center flex-1">
              <p className="text-sm font-medium text-rose-700">
                Remaining Days
              </p>
              <p className="text-2xl font-bold text-rose-500 mt-1">
                {data?.subscriptionInfo?.remainingDays || "N/A"}
              </p>
            </div>
            <div className="bg-white rounded-md shadow-sm p-3 border border-rose-200 text-center flex-1">
              <p className="text-sm font-medium text-rose-700">End Date</p>
              <p className="text-2xl font-bold text-rose-500 mt-1">
                {data?.subscriptionInfo?.endDate
                  ? new Date(
                      data?.subscriptionInfo?.endDate
                    )?.toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <Link
            to="/dashboard/plans"
            className="inline-block px-8 py-3 bg-gradient-to-r from-pink-300 to-rose-500 text-white font-bold text-sm capitalize rounded shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 border border-pink-200 hover:border-white"
          >
            💅 Pay Subscription Fee 💄
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Payment History
        </h1>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">#</th>
                  <th className="px-4 py-2 border text-left">Transaction ID</th>
                  <th className="px-4 py-2 border text-center">Account</th>
                  <th className="px-4 py-2 border text-center">Method</th>
                  <th className="px-4 py-2 border text-center">Status</th>
                  <th className="px-4 py-2 border text-left">Date</th>
                  <th className="px-4 py-2 border text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    onClick={() => openModal(payment)} // Open modal with selected payment details
                    key={payment._id}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border truncate">
                      {payment?.transaction_id}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {payment?.account}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {payment?.method}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                          payment?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-300 shadow-sm"
                            : payment?.status === "rejected"
                            ? "bg-red-100 text-red-800 border border-red-300 shadow-sm"
                            : "bg-green-100 text-green-800 border border-green-300 shadow-sm"
                        }`}
                      >
                        {payment?.status.charAt(0).toUpperCase() +
                          payment?.status.slice(1)}
                      </span>
                    </td>

                    <td className="px-4 py-2 border">
                      {new Date(payment?.createdAt)?.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border text-right">
                      <CurrencyFormatter value={payment?.amount} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">
            No payments found.
          </div>
        )}
      </div>

      {/* Modal to display payment details */}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-md"}>
        {selectedPayment && (
          <div>
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <p>
              <strong>Transaction ID:</strong> {selectedPayment?.transaction_id}
            </p>
            <p>
              <strong>Account:</strong> {selectedPayment?.account}
            </p>
            <p>
              <strong>Method:</strong> {selectedPayment?.method}
            </p>
            <p>
              <strong>Brand ID:</strong> {selectedPayment?.brand_id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedPayment.createdAt)?.toLocaleString()}
            </p>
            <p>
              <strong>Amount:</strong>{" "}
              <CurrencyFormatter value={selectedPayment?.amount} />
            </p>
            {selectedPayment?.declined_reason && (
              <p>
                <strong>Declined Reason:</strong>{" "}
                {selectedPayment?.declined_reason}
              </p>
            )}

            {/* Action Buttons */}
            {user?.username === "sajib" && (
              <>
                <div className="mt-6 flex gap-4">
                  <button
                    disabled={updateLoading}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleDone}
                  >
                    {updateLoading ? <PrimaryLoading /> : "Done"}
                  </button>
                  <button
                    disabled={rejectLoading}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setIsRejecting(true)}
                  >
                    {rejectLoading ? <PrimaryLoading /> : "Reject"}
                  </button>
                </div>

                {/* Show input for days after "Done" button is clicked */}
                {isDone && (
                  <div className="mt-4">
                    <label htmlFor="days" className="block mb-2">
                      Enter Number of Days:
                    </label>
                    <input
                      id="days"
                      type="number"
                      value={days}
                      onChange={handleDaysChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Number of days"
                    />
                    <button
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={handleSubmitDone}
                      disabled={
                        updateLoading || !days || isNaN(days) || days <= 0
                      }
                    >
                      {updateLoading ? <PrimaryLoading /> : "Submit Done"}
                    </button>
                  </div>
                )}

                {/* Reject Explanation */}
                {isRejecting && (
                  <div className="mt-4">
                    <textarea
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Please provide a reason for rejection"
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                    ></textarea>
                    <button
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={handleReject}
                    >
                      Submit Rejection
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Payment;
