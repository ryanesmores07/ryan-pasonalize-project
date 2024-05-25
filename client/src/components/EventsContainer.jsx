import Event from "./Event";
import styled from "styled-components";
import PageBtnContainer from "./PageBtnContainer";
import { useEventsContext } from "../pages/Events";

const EventsContainer = () => {
  const { data } = useEventsContext();

  if (data.length === 0) {
    return (
      <Wrapper>
        <h2>No events to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>{/* {totalEvents} event{data.length > 1 && "s"} found */}Events</h5>
      <Event data={data} />
      {/* <PageBtnContainer /> */}
    </Wrapper>
  );
};
export default EventsContainer;

const Wrapper = styled.section``;
