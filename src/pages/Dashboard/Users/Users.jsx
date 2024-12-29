import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../redux/features/auth/authApi";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";
import DeleteUser from "../../../components/User/DeleteUser/DeleteUser";
import AddNewUser from "../../../components/User/AddNewUser/AddNewUser";

const Users = () => {
  const { data: users, isLoading: userLoading } = useGetUsersQuery();
  return (
    <div className="py-6 px-4">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link to={"/dashboard"} className="text-gray-400">
            Dashboard {">"}{" "}
          </Link>
          <Link to={"/dashboard/users"}>Users ({users?.data?.length})</Link>
        </div>
        <p className="text-[14px] capitalize">list of Users</p>
      </div>

      <AddNewUser />

      <>
        <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative overflow-x-auto">
          {/* table */}
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[12px] sm:text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[30%] text-start">Name</th>
                <th className="w-[20%] text-start">Username</th>
                <th className="w-[10%] text-start">Mobile</th>
                <th className="w-[10%] text-start">Role</th>
                <th className="w-[5%] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((d, i) => (
                <tr
                  key={i}
                  className="border-b border-[#ebebeb] min-h-[40px] w-full sm:text-[16px] hover:bg-blue-100"
                >
                  <td className="pl-4 py-2 text-[12px]">{i + 1}</td>
                  <td className="capitalize text-[12px] hover:underline hover:text-blue-600">
                    <Link to={d?.user_id}>{d?.name}</Link>
                  </td>
                  <td className="text-[12px]">{d?.username}</td>
                  <td className="capitalize text-[12px]">{d?.mobile}</td>
                  <td className="capitalize text-[12px]">{d?.role}</td>

                  <td className="text-center">
                    {d?.username !== "sajib" && (
                      <DeleteUser id={d?.user_id} isLoading={userLoading} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {userLoading && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 sm:left-[50%]">
              <PrimaryLoading message="Please wait..." />
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Users;
