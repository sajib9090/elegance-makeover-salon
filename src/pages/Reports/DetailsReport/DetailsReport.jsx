import { FaSellsy } from "react-icons/fa6";
import DashboardBox from "../../../components/DashboardBox/DashboardBox";
import { useGetAllSoldInvoicesByDateQuery } from "../../../redux/features/soldInvoice/soldInvoiceApi";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import { useGetAllExpensesByDateQuery } from "../../../redux/features/expense/expenseApi";

const DetailsReport = () => {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  const formattedMonth = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;

  const { data: dateWiseExpense, isLoading: dateWiseExpenseLoading } =
    useGetAllExpensesByDateQuery(
      {
        date: formattedDate,
      },
      { skip: !formattedDate }
    );

  const { data: dateWiseData, isLoading: dateWiseLoading } =
    useGetAllSoldInvoicesByDateQuery(
      { date: formattedDate },
      { skip: !formattedDate }
    );
  const { data: monthWiseData, isLoading: monthWiseLoading } =
    useGetAllSoldInvoicesByDateQuery(
      { month: formattedMonth },
      { skip: !formattedMonth }
    );

  let totalBillSumByDate = 0;

  // Calculate total bill sum if data is available
  if (dateWiseData?.data?.length) {
    totalBillSumByDate = dateWiseData?.data?.reduce(
      (sum, invoice) => sum + (invoice?.total_bill || 0),
      0
    );
  }
  let totalExpenseSumByDate = 0;

  // Calculate total bill sum if data is available
  if (dateWiseExpense?.data?.length) {
    totalExpenseSumByDate = dateWiseExpense?.data?.reduce(
      (sum, invoice) => sum + (invoice?.total_bill || 0),
      0
    );
  }
  let totalBillSumByMonth = 0;

  // Calculate total bill sum if data is available
  if (monthWiseData?.data?.length) {
    totalBillSumByMonth = monthWiseData?.data?.reduce(
      (sum, invoice) => sum + (invoice?.total_bill || 0),
      0
    );
  }

  // Determine profit or loss
  const profitOrLoss = totalBillSumByDate - totalExpenseSumByDate;
  const profitOrLossText =
    profitOrLoss >= 0
      ? `Profit: ${Math.abs(profitOrLoss)}`
      : `Loss: ${Math.abs(profitOrLoss)}`;

  return (
    <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardBox
        borderColor={"border-sky-300"}
        backGroundColor={"bg-sky-200"}
        logo={<FaSellsy />}
        logoColor={"text-sky-600"}
        link={`#`}
        quantity={
          dateWiseLoading || dateWiseExpenseLoading
            ? "Calculating..."
            : profitOrLossText
        }
        title={"Profit / Loss"}
      />
    </div>
  );
};

export default DetailsReport;
