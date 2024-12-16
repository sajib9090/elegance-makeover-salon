import { MdCategory, MdOutlineEventAvailable } from "react-icons/md";
import DashboardBox from "../../components/DashboardBox/DashboardBox";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useGetAllServicesQuery } from "../../redux/features/service/serviceApi";
import { GiHumanPyramid } from "react-icons/gi";
import { useGetAllEmployeesQuery } from "../../redux/features/employee/employeeApi";
import { FaUserFriends } from "react-icons/fa";
import { useGetUsersQuery } from "../../redux/features/auth/authApi";

const Dashboard = () => {
  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategoriesQuery();

  const { data: services, isLoading: serviceLoading } = useGetAllServicesQuery({
    searchValue: "",
    pageValue: "",
    limitValue: "",
    sortPrice: "",
    category: "",
  });
  const { data: employees, isLoading: employeeLoading } =
    useGetAllEmployeesQuery({
      searchValue: "",
      pageValue: "",
      limitValue: "",
    });
  const { data: users, isLoading: userLoading } = useGetUsersQuery();

  return (
    <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardBox
        borderColor={"border-pink-300"}
        backGroundColor={"bg-pink-200"}
        logo={<MdOutlineEventAvailable />}
        logoColor={"text-pink-600"}
        link={"services"}
        quantity={
          serviceLoading ? "Loading..." : services?.data?.length || "00"
        }
        title={"Services Available"}
      />

      <DashboardBox
        borderColor={"border-red-300"}
        backGroundColor={"bg-red-200"}
        logo={<MdCategory />}
        logoColor={"text-red-600"}
        link={"categories"}
        quantity={
          categoryLoading ? "Loading..." : categories?.data?.length || "00"
        }
        title={"Categories Available"}
      />
      <DashboardBox
        borderColor={"border-orange-300"}
        backGroundColor={"bg-orange-200"}
        logo={<GiHumanPyramid />}
        logoColor={"text-orange-600"}
        link={"employees"}
        quantity={
          employeeLoading ? "Loading..." : employees?.data?.length || "00"
        }
        title={"Total Employees"}
      />
      <DashboardBox
        borderColor={"border-lime-300"}
        backGroundColor={"bg-lime-200"}
        logo={<FaUserFriends />}
        logoColor={"text-lime-600"}
        link={"users"}
        quantity={userLoading ? "Loading..." : users?.data?.length || "00"}
        title={"Total Users"}
      />
    </div>
  );
};

export default Dashboard;
