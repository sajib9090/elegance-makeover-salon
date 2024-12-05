/* eslint-disable react/prop-types */
import { useMemo, useState, useEffect, useRef } from "react";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
import Modal from "../../Modal/Modal";
import { useCreateSellMutation } from "../../../redux/features/sellApi/SellApi";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { removeAllItems } from "../../../redux/features/sellApi/SellSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ cart }) => {
  const [discountValue, setDiscountValue] = useState("");
  const [discountType, setDiscountType] = useState("percent");
  const [isOpen, setIsOpen] = useState(false);
  const printButtonRef = useRef(null);

  // Function to simulate button click
  const handleKeyDown = (event) => {
    if (event.shiftKey && event.key === "Enter") {
      printButtonRef.current?.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle Print button click
  const handlePrint = () => {
    setIsOpen(true);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createSell, { isLoading }] = useCreateSellMutation();
  const handleYes = async () => {
    const data = {
      items: cart,
      total_discount: calculatedDiscount,
      sub_total_bill: totalAfterDiscount + calculatedDiscount,
      final_bill: totalAfterDiscount,
    };

    try {
      const res = await createSell(data).unwrap();
      console.log(res?.data);
      if (res?.success) {
        setIsOpen(false);
        dispatch(removeAllItems());
        toast.success("Successfully sold");
        navigate(`${res?.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate discount and total
  const calculatedDiscount = useMemo(() => {
    const subtotal = cart?.reduce(
      (acc, item) => acc + (item?.s_quantity || 0) * (item?.sell_price || 0),
      0
    );

    if (discountType === "percent") {
      const adjustedDiscounts = cart?.map((item) => {
        const maxDiscountPercent =
          ((item?.sell_price - item?.purchase_price) / item?.sell_price) * 100;
        const userDiscountPercent = parseFloat(discountValue || 0);
        const finalDiscountPercent = Math.min(
          userDiscountPercent,
          maxDiscountPercent
        );
        return (
          (item?.s_quantity || 0) *
          item?.sell_price *
          (finalDiscountPercent / 100)
        );
      });

      return adjustedDiscounts.reduce((acc, discount) => acc + discount, 0);
    } else if (discountType === "amount") {
      const userDiscountAmount = parseFloat(discountValue || 0);

      const maxDiscountAmounts = cart?.map((item) => {
        const maxDiscount =
          (item?.s_quantity || 0) * (item?.sell_price - item?.purchase_price);
        return Math.min(
          (userDiscountAmount / subtotal) * item?.sell_price,
          maxDiscount
        );
      });

      return maxDiscountAmounts?.reduce((acc, discount) => acc + discount, 0);
    }
    return 0;
  }, [cart, discountValue, discountType]);

  const totalAfterDiscount = useMemo(() => {
    const subtotal = cart?.reduce(
      (acc, item) => acc + (item?.s_quantity || 0) * (item?.sell_price || 0),
      0
    );
    return Math.max(subtotal - calculatedDiscount, 0);
  }, [cart, calculatedDiscount]);

  return (
    <div className="bg-yellow-50 w-full min-h-[70vh] border border-gray-200 rounded mt-4 p-2 col-span-1 md:col-span-2 flex flex-col justify-between">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Overview</h3>
        <ul className="text-sm text-gray-600">
          <li className="flex justify-between mb-2">
            <span>Total Items:</span>
            <span>{cart?.length}</span>
          </li>
          <li className="flex justify-between mb-2">
            <span>Total Qty:</span>
            <span>
              {cart.reduce((acc, item) => acc + (item?.s_quantity || 0), 0)}
            </span>
          </li>
          <li className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>
              <CurrencyFormatter
                value={cart?.reduce(
                  (acc, item) =>
                    acc + (item?.s_quantity || 0) * (item?.sell_price || 0),
                  0
                )}
              />
            </span>
          </li>
          <li className="flex flex-col mb-2">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Discount (% or Amount):
            </label>
            <div className="flex flex-col-reverse items-center gap-2">
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                placeholder="Enter discount"
                className="border border-gray-300 rounded px-2 py-1 w-20"
              />
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 w-20"
              >
                <option value="percent">%</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </li>
          <li className="flex justify-between mb-2">
            <span>Discount:</span>
            <span>
              <CurrencyFormatter value={calculatedDiscount} />
            </span>
          </li>
          <li className="flex justify-between">
            <span>Total Bill:</span>
            <span className="font-bold">
              <CurrencyFormatter value={totalAfterDiscount} />
            </span>
          </li>
        </ul>
      </div>

      <button
        disabled={cart?.length === 0}
        ref={printButtonRef}
        className="bg-yellow-500 w-full text-black font-semibold rounded py-1 hover:bg-opacity-75"
        onClick={handlePrint}
      >
        Sell
      </button>

      {/* Modal Component */}
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-[260px]"}>
          <div className="text-center">
            <p className="text-lg font-semibold mb-1">Are you sure? </p>
            <p className="text-sm font-semibold mb-4 flex items-center justify-center text-yellow-600">
              Total Bill: <CurrencyFormatter value={totalAfterDiscount} />
            </p>
            <div className="flex justify-center space-x-4">
              <button
                disabled={isLoading}
                onClick={handleYes}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {isLoading ? <PrimaryLoading /> : "Yes"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;