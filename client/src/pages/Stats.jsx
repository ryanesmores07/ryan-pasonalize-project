import StatsContainer from "../components/StatsContainer";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { stats } = useLoaderData();
  console.log(stats);
  return (
    <>
      <StatsContainer defaultStats={stats} />
    </>
  );
};

export default Stats;
