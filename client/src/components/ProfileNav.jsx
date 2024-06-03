import ProfileLogoutContainer from "./ProfileLogoutContainer";
import styled from "styled-components";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import LanguageSwitcher from "./LanguageSwitcher";

const ProfileNav = ({ user }) => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };
  return (
    <Wrapper>
      <nav className={`${user.jobDepartment} nav-container`}>
        <Link to="/dashboard" className="btn return">
          <IoMdReturnLeft /> Return
        </Link>
        <div className="name-team">
          <h4>
            {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{" "}
            {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
          </h4>
          <span style={{ color: "var(--dark-red)", marginTop: "-.3rem" }}>
            {" "}
            |{" "}
          </span>
          <span
            style={{
              color: "var(--dark-red)",
              fontSize: "1.3rem",
            }}
          >
            {user.jobDepartment + " " + "team"}
          </span>
        </div>
        <div className="btn-container">
          <LanguageSwitcher />
        </div>
      </nav>
    </Wrapper>
  );
};

export default ProfileNav;

const Wrapper = styled.nav`
  position: relative;
  .return {
    font-size: 1.5rem;
    position: absolute;
    color: var(--off-black);
    background-color: var(--light-blue);
    left: -0.5rem;
    top: 6rem;
    padding: 0.5rem;
    &:hover {
      background-color: var(--pink);
      color: var(--off-white);
    }
  }
  .nav-container {
    padding: 0 16rem;
    display: flex;
    justify-content: space-between;
    height: 145px;
    box-shadow: var(--shadow-1);

    .name-team {
      display: flex;
      align-items: center;
      align-self: flex-end;
      font-size: 2rem;
      gap: 0.5rem;
    }
    .btn-container {
      align-self: center;
    }
  }

  @media (max-width: 1024px) {
    .nav-container {
      padding: 0 8rem; /* Adjust padding for 1024px and below */
    }
    .name-team {
      font-size: 1.5rem; /* Adjust font size for 1024px and below */
    }
  }

  @media (max-width: 768px) {
    .nav-container {
      padding: 0 4rem; /* Adjust padding for 768px and below */
    }
    .name-team {
      font-size: 1.2rem; /* Adjust font size for 768px and below */
    }
  }
`;
