import { useState } from "react";
import DetailsModal from "../DetailsModal/DetailsModal";

/* eslint-disable react/prop-types */
const DetailsIndividualSell = ({ customer, totalQuantity, carts }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center capitalize text-pink-600 underline">
        {customer?.name}
      </h2>

      <div className="flex justify-end sticky z-[999] top-24 mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-white text-pink-600 font-bold rounded-full shadow-md flex items-center justify-center transition-all duration-300 group focus:outline-none border border-pink-600"
        >
          {/* Animated Border */}
          <span
            className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-pink-600 group-focus:border-pink-500 animate-border transition-all duration-500"
            aria-hidden="true"
          ></span>

          {/* Count Badge */}
          <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-semibold rounded-full px-2 py-0.5 shadow-sm">
            {totalQuantity}
          </span>

          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16l4-4m0 0l4-4m-4 4H4m12 0h4"
            />
          </svg>
        </button>
      </div>

      {/* modal */}
      <DetailsModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        carts={carts}
        customer={customer}
      />
    </>
  );
};

export default DetailsIndividualSell;
