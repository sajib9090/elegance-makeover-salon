import { useSelector } from "react-redux";
import defaultLogo from "../../assets/logo/Screenshot_2024-12-06_100318-removebg-preview.png";
import { currentUser } from "../../redux/features/auth/authSlice";
import useGreetings from "../Greetings/Greetings";
const Header = () => {
  const user = useSelector(currentUser);
  const { currentDateTime, greeting } = useGreetings();

  return (
    <div className="h-[80px] hidden sm:hidden md:hidden lg:flex">
      <div className="bg-slate-200 w-[256px] flex items-center justify-between px-2 shadow">
        <div>
          <img
            className="h-[50px]"
            src={user?.brand?.brand_logo?.url || defaultLogo}
            alt=""
          />
        </div>
        <div>
          <p className="capitalize font-semibold">
            {user?.brand?.brand_name || "brand_name"}
          </p>
          <p className="capitalize text-[10px] text-gray-500">
            {user?.brand?.address?.sub_district || "sub-district"},{" "}
            {user?.brand?.address?.district || "district"}
          </p>
        </div>
      </div>
      <div className="bg-[#F7FAFD] flex-grow shadow border-b border-[#d6d5d5] flex items-center justify-end">
        <div className="pr-4">
          <h2 className="text-base font-semibold text-end">{greeting}</h2>
          <p className="text-center text-[14px] text-gray-500">{currentDateTime}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
