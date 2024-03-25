import StatsContainer from "../components/StatsContainer";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const teamCountQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/users/stats");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(teamCountQuery);
  return data;
};

const TeamCount = () => {
  const { data } = useQuery(teamCountQuery);

  const { stats } = data;
  return (
    <>
      <StatsContainer defaultStats={stats} />
    </>
  );
};

export default TeamCount;
