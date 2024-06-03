import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useLoaderData, redirect } from "react-router-dom";
import ProfileNav from "../components/ProfileNav";
import { useQuery } from "@tanstack/react-query";
import avatarTemp from "../assets/images/UserPage/default.jpg";
import { useTranslation } from "react-i18next";

const profileQuery = (params) => {
  const id = params?.id || "current-user";
  return {
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/users/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    if (params) {
      try {
        await queryClient.ensureQueryData(profileQuery(params));
        return params;
      } catch (error) {
        console.error("Error fetching current user data:", error);
        return redirect("/");
      }
    }
  };

const Profile = () => {
  const params = useLoaderData();
  const {
    data: { user },
  } = useQuery(profileQuery(params));
  const { t } = useTranslation();

  return (
    <Wrapper>
      <ProfileNav user={user} />
      <div className="container">
        <div className="photo-about-container">
          <div className="photo">
            {user.avatar ? (
              <img src={user.avatar} alt="avatar" className="avatar" />
            ) : (
              <img src={avatarTemp} alt="avatar" className="avatar" />
            )}
          </div>

          <div className="about">
            <div className="name-container">
              <h1>
                {user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)}{" "}
                {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}
              </h1>
              <h3>
                {t("nickname")}:{" "}
                <span style={{ color: "var(--off-black)" }}>
                  {'"' + user.nickname + '"'}
                </span>
              </h3>
            </div>
            <div className="about-me-container">
              <h4>{t("aboutMe")}:</h4>
              <p className="about-me-text">{user.aboutMe}</p>
            </div>
          </div>
        </div>
        <div className="prompt-container">
          <div className="left-prompt">
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("team")}</h4>
              </div>
              <div className="p-value">
                <p>{user.jobDepartment}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("position")}</h4>
              </div>
              <div className="p-value">
                <p>{user.jobPosition}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("workplace")}</h4>
              </div>
              <div className="p-value">
                <p>{user.jobBranch}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("yearJoined")}</h4>
              </div>
              <div className="p-value">
                <p>{user.yearEmployed}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("zodiac")}</h4>
              </div>
              <div className="p-value">
                <p>{user.zodiacSign}</p>
              </div>
            </div>
          </div>
          <div className="right-prompt">
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("loveLanguage")}</h4>
              </div>
              <div className="p-value">
                <p>{user.loveLanguage}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("blood")}</h4>
              </div>
              <div className="p-value">
                <p>{user.bloodType}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("favoriteHobbyLabel")}</h4>
              </div>
              <div className="p-value">
                <p>{user.hobby}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("celebrityCrushLabel")}</h4>
              </div>
              <div className="p-value">
                <p>{user.celebrityCrush}</p>
              </div>
            </div>
            <div className="key-value-pair">
              <div className="h4-key">
                <h4>{t("hometownLabel")}</h4>
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
  .container {
    margin: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;

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
        .about-me-text {
          margin-top: 1;

          overflow-wrap: break-word; /* Allow the text to wrap */
        }
        margin-top: 3rem;
        margin-bottom: 2rem;
      }
    }
  }

  .prompt-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10rem;
  }

  .left-prompt,
  .right-prompt {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
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
      font-weight: 400;
    }
    /* &::after {
      content: "";
      position: absolute;
      width: 80%;
      height: 1px;
      opacity: 0.2;
      background-color: var(--blue);
      bottom: 0;
    } */
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
  .others {
    margin-left: 0px;
    background-color: orange;
    &::after {
      display: none;
    }
  }

  /* Media query for 1024px */
  @media (min-width: 1024px) {
    .container {
      margin: 0 auto;
      max-width: 1240px;
      .photo-about-container {
      }
    }
    .prompt-container {
    }
    .photo-about-container {
      padding: 80px 150px;
      gap: 150px;
      .photo {
        width: 500px;
        height: 500px;
      }
      .about {
        .name-container {
          h1 {
            font-size: 7rem;
          }
        }
      }
    }
  }

  /* Media query for 768px */
  @media (min-width: 768px) {
    .photo-about-container {
      flex-direction: row;
      width: 100%;
      padding: 50px 100px;
      justify-content: flex-start;
      .about-me-container {
        p {
          margin-top: 1rem;

          font-size: 1.5rem;
          line-height: 1.5;
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
    .prompt-container {
      flex-direction: row;
      padding-inline: 100px;
    }
  }
`;
