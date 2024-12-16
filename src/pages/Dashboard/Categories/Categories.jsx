import { Link } from "react-router-dom";
import AddNewCategory from "../../../components/Categories/AddNewCategory/AddNewCategory";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../redux/features/category/categoryApi";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";

const Categories = () => {
  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategoriesQuery();

  const [deleteCategory, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();

  const handleRemove = async (id) => {
    const data = {
      categoryId: id,
    };
    try {
      const response = await deleteCategory(data).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-6 px-4">
      <AddNewCategory />
      <div className="pl-6 pt-2">
        <div className="flex justify-between">
          <div>
            <div className="text-[18px] font-bold capitalize">
              <Link to={"/dashboard"} className="text-gray-400">
                Dashboard {">"}{" "}
              </Link>
              <Link to={"/dashboard/categories"}>
                Categories ({categories?.data?.length})
              </Link>
            </div>
            <p className="text-[14px] capitalize">list of Categories</p>
          </div>
        </div>

        <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative overflow-x-auto">
          {/* table */}
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px] sm:text-[16px]">
                <th className="w-[10%] text-start pl-4">No.</th>
                <th className="w-[70%] text-start">Groups/Generic</th>
                <th className="w-[20%] text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.data?.map((d, i) => (
                <tr
                  key={i}
                  className="border-b border-[#ebebeb] h-[40px] w-full text-[14px] sm:text-[16px]"
                >
                  <td className="pl-4 py-2">{i + 1}</td>
                  <td className="capitalize">{d?.category}</td>
                  <td>
                    <button
                      disabled={deleteLoading || categoryLoading}
                      onClick={() => handleRemove(d?.category_id)}
                      className="flex items-center text-[12px] sm:text-[14px] text-red-600"
                    >
                      {deleteLoading ? "Please wait..." : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {categoryLoading && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 sm:left-[50%]">
              <PrimaryLoading message="Please wait..." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
