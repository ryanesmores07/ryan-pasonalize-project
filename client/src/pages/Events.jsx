import customFetch from "../utils/customFetch";
import { EventsContainer } from "../components";
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext } from "react";

const eventsQuery = {
  queryKey: ["events"],
  queryFn: async () => {
    const response = await customFetch.get("/events");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(eventsQuery);
  return null;
};
const EventsContext = createContext();

const Events = () => {
  const { data } = useQuery(eventsQuery);
  return (
    <EventsContext.Provider value={{ data }}>
      {/* <SearchContainer /> */}
      <EventsContainer />
    </EventsContext.Provider>
  );
};

export const useEventsContext = () => useContext(EventsContext);
export default Events;
