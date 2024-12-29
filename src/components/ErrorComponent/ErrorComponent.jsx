/* eslint-disable react/prop-types */

const ErrorComponent = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-50">
      {/* Error Icon with Beauty Decor */}
      <div className="relative">
        <div className="bg-pink-300 p-5 rounded-full shadow-lg animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
        </div>
        <div className="absolute top-0 left-0 right-0 -z-10 h-20 w-20 bg-pink-200 rounded-full opacity-50 blur-sm"></div>
      </div>

      {/* Error Message */}
      <h1 className="mt-6 text-2xl font-bold text-pink-800 font-cursive">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-700 text-center mt-3 px-6 font-light leading-relaxed">
        {error?.data?.message ||
          "We couldn't process your request. Please try again later!"}
      </p>

      {/* Decorative Divider */}
      <div className="w-16 h-1 bg-pink-400 mt-4 rounded-full"></div>

      {/* Retry Button */}
      <div className="mt-8">
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition transform hover:scale-105"
        >
          Retry
        </button>
      </div>

      {/* Support Info */}
      <p className="text-sm text-gray-500 mt-6">
        Need help? Contact us at{" "}
        <a
          href="mailto:support@beautyparlour.com"
          className="text-pink-600 underline"
        >
          saifsajib97@gmail.com
        </a>
      </p>
    </div>
  );
};

export default ErrorComponent;
