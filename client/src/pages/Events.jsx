import customFetch from "../utils/customFetch";
import {
  EventSearchContainer,
  EventsContainer,
  SearchContainer,
} from "../components";
import { useQuery } from "@tanstack/react-query";
import { useContext, createContext } from "react";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";

const allEventsQuery = (params) => {
  const { search, eventStatus, page, sort } = params;
  return {
    queryKey: [
      "events",
      search ?? "",
      eventStatus ?? "future_events",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/events", {
        params,
      });
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
    await queryClient.ensureQueryData(allEventsQuery(params));
    return { searchValues: { ...params } };
  };
const EventsContext = createContext();
const Events = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allEventsQuery(searchValues));
  return (
    <Wrapper>
      <EventsContext.Provider value={{ data, searchValues }}>
        <EventSearchContainer />
        <EventsContainer />
      </EventsContext.Provider>
    </Wrapper>
  );
};

export const useEventsContext = () => useContext(EventsContext);
export default Events;

const Wrapper = styled.section``;
