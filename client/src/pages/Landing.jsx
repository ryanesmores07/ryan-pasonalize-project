import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <button type="button" onClick={() => navigate("/register")}>
        register
      </button>
      <button type="button" onClick={() => navigate("/login")}>
        login
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Landing;
