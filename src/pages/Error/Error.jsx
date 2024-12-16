import { Link } from "react-router-dom";


const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
      <div className="relative">
        {/* Background Circle */}
        <div className="absolute inset-0 rounded-full w-72 h-72 bg-pink-200 blur-2xl animate-pulse opacity-70"></div>

        {/* Error Content */}
        <div className="relative bg-white shadow-lg rounded-3xl p-10 text-center max-w-sm mx-auto">
          <h1 className="text-6xl font-bold text-pink-600 animate-bounce">
            404
          </h1>
          <p className="text-lg font-medium text-gray-700 mt-2">
            Oops! Page Not Found
          </p>
          <p className="text-gray-600 mt-2">
            The page you are looking for doesn’t exist or has been moved.
          </p>

          <Link
            href="/"
            className="mt-5 inline-block bg-pink-500 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 flex space-x-4">
        <div className="w-4 h-4 rounded-full bg-pink-400 animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-purple-400 animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Error;
