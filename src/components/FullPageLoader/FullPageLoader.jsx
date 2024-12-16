const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="beauty-loader">
        {/* Rotating Brushstroke Circle */}
        <div className="circle"></div>

        {/* Beauty Icon in the Center */}
        <div className="icon">
          <i className="fas fa-lipstick"></i> {/* FontAwesome Icon */}
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;
