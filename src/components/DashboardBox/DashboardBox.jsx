import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const DashboardBox = ({
  borderColor,
  backGroundColor,
  link,
  logo,
  logoColor,
  quantity,
  title,
}) => {
  return (
    <Link
      to={link}
      className={`h-[160px] rounded border-[2px] ${borderColor} flex flex-col justify-between`}
    >
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className={`${logoColor} text-5xl font-bold`}>{logo}</div>
        <h1 className="text-2xl font-bold">{quantity}</h1>
        <p className="text-sm text-gray-700">{title}</p>
      </div>
      <div
        className={`border-t-[2px] ${borderColor} h-[30px] w-full ${backGroundColor} text-center`}
      >
        <p>View Details </p>
      </div>
    </Link>
  );
};

export default DashboardBox;
