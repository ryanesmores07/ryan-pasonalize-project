import { useRouteError, Link } from "react-router-dom";
import styled from "styled-components";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      <ErrorMessage>There was an error...</ErrorMessage>
      <Link to="/dashboard">Back to homepage</Link>
    </>
  );
};

export default ErrorElement;

const ErrorMessage = styled.h4`
  font-size: 3rem;
`;
