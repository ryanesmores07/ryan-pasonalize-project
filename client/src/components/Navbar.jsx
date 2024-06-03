import { FaAlignLeft } from "react-icons/fa";
import Logo from "../components/Logo";
import { useDashboardContext } from "../pages/Dashboard";
import LogoutContainer from "./LogoutContainer";
import styled from "styled-components";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div className="logo-container">
          <Logo />
          <h4 className="logo-text">Dashboard</h4>
        </div>
        <div className="btn-container">
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  z-index: 99;
  height: 10rem; /* Adjusted height for smaller screens */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--light-blue);

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--off-black);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .logo-text {
    display: none;
    font-size: 2rem; /* Adjusted font size */
    font-weight: 500;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem; /* Added gap for spacing */
  }

  .logo {
    display: flex;
    align-items: center;
    width: 10rem;
  }

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media (max-width: 767px) {
    .logo-container {
      display: none;
    }
  }

  @media (min-width: 768px) {
    .logo-text {
      display: block;
    }
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    height: 14.5rem; /* Adjusted height for larger screens */
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
      font-size: 3.5rem; /* Adjusted font size */
    }
    .toggle-btn {
      font-size: 3rem;
    }
  }
`;
