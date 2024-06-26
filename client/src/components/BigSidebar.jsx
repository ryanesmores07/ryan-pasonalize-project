import styled from "styled-components";
import { useDashboardContext } from "../pages/Dashboard";
import { Logo } from "../components/";

import NavLinks from "./NavLinks";

const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 1024px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--light-blue);
      min-height: 100vh;
      height: 100%;
      width: 295px;
      margin-left: -295px;
      transition: margin-left 0.3s ease-in-out;
    }
    .content {
      position: sticky;
      top: 1rem;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      margin-left: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      position: relative;
      top: 7rem;
      display: flex;
      font-size: 1.5rem;
      align-items: center;
      color: var(--off-black);
      padding-left: 5.5rem;
      margin-bottom: 4rem;
      text-transform: capitalize;
      transition: var(--transition);
    }
    .nav-link:hover {
      padding-left: 6rem;
      color: var(--blue);
    }

    .nav-link:focus {
      /* padding-left: 6rem; */
      color: var(--dark-blue);
    }

    .icon {
      font-size: 2.5rem;
      margin-right: 1.5rem;
      display: grid;
      place-items: center;
    }
    .active {
      color: var(--off-black);
    }
    .pending {
      background: var(--off-white);
    }
    .logo {
      margin-top: 7rem;
      margin-left: 4rem;
    }
  }

  @media (min-width: 1024px) {
    .sidebar-container {
    }
  }
`;
