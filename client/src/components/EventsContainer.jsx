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
      <h2>
        {data.length} total event{data.length > 1 && "s"} found
      </h2>
      <Event data={data} />
      {/* <PageBtnContainer /> */}
    </Wrapper>
  );
};
export default EventsContainer;

const Wrapper = styled.section`
  padding: 3rem 0;
  h2 {
    margin-bottom: 2rem;
  }
`;
