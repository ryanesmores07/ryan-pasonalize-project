import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";

import ProfileNav from "../components/ProfileNav";

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

  return (
    <Wrapper>
      <ProfileNav user={user} />
      <div className="container">
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
              <h3>
                Nickname:{" "}
                <span style={{ color: "var(--off-black)" }}>
                  {'"' + user.nickname + '"'}
                </span>
              </h3>
            </div>
            <div className="about-me-container">
              <h4>About me:</h4>
              <p>{user.aboutMe}</p>
            </div>
          </div>
        </div>
        <div className="prompt-container">
          <div className="left-prompt">
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Team:</h4>
              </div>
              <div className="p-value">
                <p>{user.jobDepartment}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Position:</h4>
              </div>
              <div className="p-value">
                <p>{user.jobPosition}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Branch:</h4>
              </div>
              <div className="p-value">
                <p>{user.jobBranch}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Year Employed:</h4>
              </div>
              <div className="p-value">
                <p>{user.yearEmployed}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Zodiac Sign:</h4>
              </div>
              <div className="p-value">
                <p>{user.zodiacSign}</p>
              </div>
            </div>
          </div>
          <div className="right-prompt">
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Love Language:</h4>
              </div>
              <div className="p-value">
                <p>{user.loveLanguage}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Blood Type:</h4>
              </div>
              <div className="p-value">
                <p>{user.bloodType}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Favorite Hobby:</h4>
              </div>
              <div className="p-value">
                <p>{user.hobby}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Celebrity Crush:</h4>
              </div>
              <div className="p-value">
                <p>{user.celebrityCrush}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>Hometown:</h4>
              </div>
              <div className="p-value">
                <p>{user.hometown}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.section`
  span {
    color: var(--off-black);
  }
  h4 {
    font-size: 2rem;
    color: var(--dark-blue);
  }
  p {
    margin-top: 0rem;
    max-width: 585px;
    font-size: 1.7rem;
  }
  .photo-about-container {
    padding: 65px 121px;
    display: flex;
    gap: 115px;

    .photo {
      box-shadow: var(--shadow-3);
      width: 400px;
      height: 400px;
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
          margin-left: -0.5rem;
          margin-bottom: 0.5rem;
          letter-spacing: -3px;
          font-size: 6rem;
          font-weight: 500;
        }
        h3 {
          font-size: 3rem;
          color: var(--dark-blue);
          &::after {
            content: "";
            position: relative;
            background-color: var(--dark-blue);
            top: 1.5rem;
            height: 3px;
            width: 55%;
            display: block;
          }
        }
      }
      .about-me-container {
        p {
          margin-top: 1rem;
        }
        margin-top: 3rem;
      }
    }
  }

  .prompt-container {
    padding-inline: 121px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10rem;
  }

  .left-prompt,
  .right-prompt {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  .key-value-pair {
    display: flex;
    margin-bottom: 2rem;
    text-transform: capitalize;
    .h4-key {
      width: 50%;
    }
    .p-value {
      display: flex;
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
