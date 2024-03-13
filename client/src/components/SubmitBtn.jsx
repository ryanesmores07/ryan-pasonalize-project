import styled from "styled-components";

import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formBtn }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.status === "submitting";

  return (
    <Wrapper>
      <button
        type="submit"
        className={`${formBtn && "form-btn"}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "submitting" : "submit"}
      </button>
    </Wrapper>
  );
};

export default SubmitBtn;

const Wrapper = styled.button`
  margin-top: 18px;
  button {
    cursor: pointer;
    width: 380px;
    height: 29px;
    background-color: var(--blue);
    color: #ffffff;
    border-radius: 5px;
    text-transform: capitalize;
    font-size: 1.5rem;
    transition: var(--transition);
    &:hover {
      background-color: var(--dark-blue);
    }
  }
`;
