import { IoMdTrendingDown } from "react-icons/io";
import DashboardBox from "../../components/DashboardBox/DashboardBox";

const Expense = () => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardBox
        borderColor={"border-pink-300"}
        backGroundColor={"bg-pink-200"}
        logo={<IoMdTrendingDown />}
        logoColor={"text-pink-600"}
        link={`daily-expenses`}
        quantity={today}
        title={"Add Daily Expense"}
      />
    </div>
  );
};

export default Expense;
