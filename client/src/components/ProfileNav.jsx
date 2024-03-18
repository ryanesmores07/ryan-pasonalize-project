import ProfileLogoutContainer from "./ProfileLogoutContainer";
import styled from "styled-components";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

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
          <IoMdReturnLeft /> to Dashboard
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
          <ProfileLogoutContainer user={user} logoutUser={logoutUser} />
        </div>
      </nav>
    </Wrapper>
  );
};

export default ProfileNav;

const Wrapper = styled.nav`
  .return {
    font-size: 1rem;
    position: absolute;
    left: 0;
    padding: 0.3rem 0.5rem;
    &:hover {
      background-color: var(--dark-blue);
      color: #ffffff;
    }
  }
  .nav-container {
    padding: 0 12rem;
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
