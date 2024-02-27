import { toast } from "react-toastify";
import { UsersContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/users", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllUsersContext = createContext();

const AllUsers = () => {
  const { data, searchValues } = useLoaderData();
  console.log(data);
  return (
    <AllUsersContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <UsersContainer />
    </AllUsersContext.Provider>
  );
};

export const useAllUsersContext = () => useContext(AllUsersContext);
export default AllUsers;
