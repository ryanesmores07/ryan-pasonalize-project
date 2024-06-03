import styled from "styled-components";

import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.status === "submitting";

  return (
    <Wrapper
      type="submit"
      className={`${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting" : "submit"}
    </Wrapper>
  );
};

export default SubmitBtn;

const Wrapper = styled.button`
  margin-top: 18px;
  cursor: pointer;
  width: 380px;
  height: 40px; /* Adjusted height */
  background-color: var(--blue);
  color: #ffffff;
  border-radius: 5px;
  text-transform: capitalize;
  font-size: 1.5rem;
  transition: var(--transition);
  &:hover {
    background-color: var(--dark-blue);
  }

  @media screen and (max-width: 1024px) {
    width: 100%; /* Adjust width for medium screens */
    height: 35px; /* Adjust height for medium screens */
    font-size: 1.4rem; /* Adjust font size for medium screens */
  }

  @media screen and (max-width: 768px) {
    width: 100%; /* Full-width for small screens */
    height: 35px; /* Adjust height for small screens */
    font-size: 1.3rem; /* Adjust font size for small screens */
  }

  @media screen and (max-width: 480px) {
    width: 100%; /* Full-width for extra small screens */
    height: 30px; /* Adjust height for extra small screens */
    font-size: 1.2rem; /* Adjust font size for extra small screens */
  }
`;
