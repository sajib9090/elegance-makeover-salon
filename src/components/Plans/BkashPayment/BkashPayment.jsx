/* eslint-disable react/prop-types */
import { useState } from "react";
import bKashLogo from "../../../assets/payment/bkash.png";
import Modal from "../../Modal/Modal";
import { toast } from "sonner";
import { useSelectPlanMutation } from "../../../redux/features/plans/planApi";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useNavigate } from "react-router-dom";

const BkashPayment = ({ id, price }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");

  const bkashAccounts = [
    { id: 1, accountNumber: "01307178265", name: "Payment" },
    { id: 2, accountNumber: "01894172023", name: "Agent" },
    { id: 3, accountNumber: "01791915643", name: "Personal" },
  ];

  const [selectPlan, { isLoading }] = useSelectPlanMutation();

  const handleSubmit = async () => {
    if (!selectedAccount || !transactionId) {
      toast.error("Please select an account and enter a transaction ID.");
      return;
    }
    const data = {
      selectedAccount,
      transactionId,
      id,
      method: "bkash",
    };
    try {
      const response = await selectPlan(data).unwrap();
      if (response?.success) {
        toast.success(response?.message || response?.data?.message);
        setIsOpen(false);
        navigate("/dashboard/payments");
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-4 py-3 bg-white text-pink-500 rounded-lg shadow-lg hover:bg-pink-100 transition border border-pink-500"
      >
        <img src={bKashLogo} alt="bKash" className="h-8" />
        Pay with bKash
      </button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-sm"}>
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Complete Your Payment - {price} TK
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select bKash Account
          </label>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">-- Select Account --</option>
            {bkashAccounts.map((account) => (
              <option key={account.id} value={account.accountNumber}>
                {account.name} ({account.accountNumber})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Transaction ID
          </label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter Transaction ID"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
        >
          {isLoading ? <PrimaryLoading /> : "Submit Payment"}
        </button>
      </Modal>
    </>
  );
};

export default BkashPayment;
