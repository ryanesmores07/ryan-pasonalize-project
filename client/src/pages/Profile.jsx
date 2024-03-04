import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import LogoutContainerProfile from "../components/ProfileLogoutContainer";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const logoutUser = async () => {
  navigate("/");
  await customFetch.get("/auth/logout");
  toast.success("Logging out...");
};

const Profile = () => {
  const { user } = useLoaderData();
  console.log(user);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="container">
        <nav className="nav-container">
          <div className="name-team">
            <h4>
              {" "}
              {user.firstName.charAt(0).toUpperCase() +
                user.firstName.slice(1)}{" "}
              {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
            </h4>
            <span> | </span>
            <span>
              {user.jobDepartment.charAt(0).toUpperCase() +
                user.jobDepartment.slice(1) +
                " " +
                "Team"}
            </span>
          </div>
          <div className="btn-container">
            <LogoutContainerProfile user={user} logoutUser={logoutUser} />
          </div>
        </nav>
      </div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.section`
  .nav-container {
    padding: 0 12rem;
    display: flex;
    justify-content: space-between;
    height: 145px;
    background-color: var(--light-purple);

    .name-team {
      display: flex;
      align-items: center;
      align-self: flex-end;
      gap: 0.5rem;
    }
    .btn-container {
      align-self: center;
    }
  }
`;
