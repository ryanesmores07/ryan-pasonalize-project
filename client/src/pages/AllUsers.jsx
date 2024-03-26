import { toast } from "react-toastify";
import { UsersContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allUsersQuery = (params) => {
  const { search, jobDepartment, bloodType, jobBranch, sort, page } = params;
  return {
    queryKey: [
      "users",
      search ?? "",
      jobDepartment ?? "all",
      jobBranch ?? "all",
      bloodType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/users", { params });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allUsersQuery(params));
    return { searchValues: { ...params } };
  };

const AllUsersContext = createContext();

const AllUsers = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allUsersQuery(searchValues));
  return (
    <AllUsersContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <UsersContainer />
    </AllUsersContext.Provider>
  );
};

export const useAllUsersContext = () => useContext(AllUsersContext);
export default AllUsers;
