import ProfileLogoutContainer from "./ProfileLogoutContainer";
import styled from "styled-components";
import { useLoaderData, useNavigate } from "react-router-dom";

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
`;
