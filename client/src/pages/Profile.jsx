import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";

import ProfileNav from "../components/ProfileNav";

export const loader = async ({ params }) => {
  if (params && params.id) {
    try {
      const { data } = await customFetch.get(`/users/${params.id}`);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return redirect("/");
    }
  }

  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    console.error("Error fetching current user data:", error);
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
    height: 3.5rem;
    display: flex;
    position: relative;
    margin-bottom: 3rem;
    text-transform: capitalize;
    .h4-key {
      width: 50%;
    }
    .p-value {
      display: flex;
      font-weight: 500;
    }
    &::after {
      content: "";
      position: absolute;
      width: 80%;
      height: 1px;
      opacity: 0.2;
      background-color: var(--blue);
      bottom: 0;
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
    background-color: var(--light-purple);
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
    background-color: var(--light-pink);
    &::after {
      display: none;
    }
  }

  /* Media query for 1024px */
  @media (min-width: 1024px) {
    .prompt-container {
      padding-inline: 150px; /* Adjust padding for larger screens */
    }
    .photo-about-container {
      padding: 80px 150px; /* Adjust padding for larger screens */
      gap: 150px; /* Adjust gap between elements for larger screens */
      .photo {
        width: 500px; /* Adjust photo width for larger screens */
        height: 500px; /* Adjust photo height for larger screens */
      }
      .about {
        .name-container {
          h1 {
            font-size: 7rem; /* Adjust font size for larger screens */
          }
        }
      }
    }
  }

  /* Media query for 768px */
  @media (min-width: 768px) {
    .prompt-container {
      padding-inline: 100px; /* Adjust padding for medium-sized screens */
    }
    .photo-about-container {
      padding: 50px 100px; /* Adjust padding for medium-sized screens */
      gap: 100px; /* Adjust gap between elements for medium-sized screens */
      .about-me-container {
        p {
          font-size: 1rem;
          line-height: 2;
        }
      }
      .photo {
        width: 300px; /* Adjust photo width for medium-sized screens */
        height: 300px; /* Adjust photo height for medium-sized screens */
      }
      .about {
        .name-container {
          h1 {
            font-size: 5rem; /* Adjust font size for medium-sized screens */
          }
        }
      }
    }
  }
`;
