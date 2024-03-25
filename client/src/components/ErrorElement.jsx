import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  return <ErrorMessage>There was an error...</ErrorMessage>;
};

export default ErrorElement;

const ErrorMessage = styled.h4`
  font-size: 3rem;
`;
