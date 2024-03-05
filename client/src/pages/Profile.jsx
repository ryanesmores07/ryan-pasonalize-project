import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProfileLogoutContainer from "../components/ProfileLogoutContainer";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const Profile = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logging out...");
  };
  return (
    <Wrapper>
      <div className="container">
        <nav className={`${user.jobDepartment} nav-container`}>
          <div className="name-team">
            <h4>
              {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}{" "}
              {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
            </h4>
            <span style={{ color: "var(--dark-red)" }}> | </span>
            <span
              style={{
                color: "var(--dark-red)",
                fontSize: "1.3rem",
                marginTop: ".3rem",
              }}
            >
              {user.jobDepartment + " " + "team"}
            </span>
          </div>
          <div className="btn-container">
            <ProfileLogoutContainer user={user} logoutUser={logoutUser} />
          </div>
        </nav>
        <div className="photo-about-container">
          <div className="photo">
            <img src={user.avatar} alt="avatar" className="avatar" />
          </div>
          <div className="about">
            <div className="name-container">
              <h1>
                {" "}
                {user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}{" "}
                {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
              </h1>
              <h3>piste</h3>
            </div>
          </div>
        </div>
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

  .photo-about-container {
    padding: 65px 121px;
    display: flex;
    gap: 115px;

    .photo {
      box-shadow: var(--shadow-3);
      width: 500px;
      height: 500px;
      .avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
    .about {
      .name-container {
        h1 {
          letter-spacing: -3px;
          font-size: 6rem;
          font-weight: 500;
        }
      }
    }
  }

  .kintone {
    margin-left: 0;
    background-color: var(--light-yellow);
    &::after {
      display: none;
    }
  }
  .infrastructure {
    margin-left: 0;
    background-color: var(--purple);
    &::after {
      display: none;
    }
  }
  .power-platform {
    margin-left: 0;
    background-color: var(--light-green);
    &::after {
      display: none;
    }
  }
  .web-ai {
    margin-left: 0px;
    background-color: var(--pink);
    &::after {
      display: none;
    }
  }
`;
