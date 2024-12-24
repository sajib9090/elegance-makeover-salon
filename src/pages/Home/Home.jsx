const Home = () => {
  return (
    <div className="bg-gradient-to-br from-pink-300 via-purple-400 to-pink-300 min-h-screen flex items-center justify-center">
      <div className="relative p-12 bg-white bg-opacity-90 shadow-2xl rounded-3xl max-w-4xl text-center">
        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-pink-400 opacity-30 blur-2xl rounded-3xl"></div>

        <h1 className="relative text-5xl font-bold text-pink-600 drop-shadow-lg tracking-wider animate-fadeIn">
          Elegance Makeover Salon
        </h1>
        <p className="relative mt-6 text-lg text-gray-600 leading-relaxed tracking-wide animate-fadeIn">
          Experience the epitome of luxury and elegance. At{" "}
          <span className="text-pink-500 font-medium">Elegance Makeover Salon</span>, we
          transform self-care into an art form. Let us pamper you with
          unparalleled beauty treatments that rejuvenate your mind, body, and
          soul.
        </p>
        <div className="relative mt-10">
          {/* Premium Call-to-Action */}
          <div className="inline-block px-12 py-5 text-2xl font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl transition-transform transform hover:scale-105">
            Your Glow, Our Priority
          </div>
        </div>

        {/* Subtle Animations */}
        <div className="absolute -bottom-12 -left-12 h-32 w-32 bg-pink-400 opacity-50 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -top-10 -right-10 h-40 w-40 bg-purple-400 opacity-50 rounded-full blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Home;
