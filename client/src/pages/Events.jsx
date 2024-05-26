import customFetch from "../utils/customFetch";
import {
  EventSearchContainer,
  EventsContainer,
  SearchContainer,
} from "../components";
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext } from "react";
import styled from "styled-components";

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
    <Wrapper>
      <EventsContext.Provider value={{ data }}>
        <EventSearchContainer />
        <EventsContainer />
      </EventsContext.Provider>
    </Wrapper>
  );
};

export const useEventsContext = () => useContext(EventsContext);
export default Events;

const Wrapper = styled.section``;
