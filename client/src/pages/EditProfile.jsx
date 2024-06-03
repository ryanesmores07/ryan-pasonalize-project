import { FormRow, FormRowSelect, ImageCropper } from "../components";
import {
  JOB_DEPARTMENT,
  JOB_POSITION,
  JOB_BRANCH,
  ZODIAC_SIGN,
  BLOOD_TYPE,
  LOVE_LANGUAGE,
} from "../../../utils/constants";
import {
  Form,
  useNavigation,
  redirect,
  useOutletContext,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("avatar");

    // if (file && file.size > 2 * 1024 * 1024) {
    //   toast.error(
    //     "Image size too large. Please select an image smaller than 2MB."
    //   );
    //   return null;
    // }

    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
      return redirect("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

const EditProfile = () => {
  const isRequired = false;
  const { user } = useOutletContext();
  const [aboutMe, setAboutMe] = useState(user.aboutMe);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { t } = useTranslation();

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <div className="form-center">
          <FormRow
            type="text"
            name="firstName"
            labelText={t("firstName")}
            defaultValue={user.firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText={t("lastName")}
            defaultValue={user.lastName}
          />
          <FormRow
            type="text"
            name="nickname"
            labelText={t("nickname")}
            defaultValue={user.nickname}
          />
          <FormRow
            labelText={t("email")}
            type="email"
            name="email"
            defaultValue={user.email}
          />
          <FormRowSelect
            name="jobBranch"
            labelText={t("jobBranch")}
            defaultValue={user.jobBranch}
            list={Object.values(JOB_BRANCH)}
          />
          <FormRowSelect
            name="jobDepartment"
            labelText={t("jobDepartment")}
            defaultValue={user.jobDepartment}
            list={Object.values(JOB_DEPARTMENT)}
          />
          <FormRowSelect
            name="jobPosition"
            labelText={t("jobPosition")}
            defaultValue={user.jobPosition}
            list={Object.values(JOB_POSITION)}
          />
          <FormRow
            labelText={t("favoriteHobby")}
            type="text"
            name="hobby"
            placeholder={t("favoriteHobbyPlaceholder")}
            defaultValue={user.hobby}
            isRequired={isRequired}
          />
          <FormRowSelect
            name="zodiacSign"
            labelText={t("zodiacSign")}
            defaultValue={user.zodiacSign}
            list={Object.values(ZODIAC_SIGN)}
          />
          <FormRowSelect
            name="bloodType"
            labelText={t("bloodType")}
            defaultValue={user.bloodType}
            list={Object.values(BLOOD_TYPE)}
          />
          <FormRowSelect
            testUrl="https://love-language.co/ja"
            name="loveLanguage"
            labelText={t("loveLanguage")}
            defaultValue={user.loveLanguage}
            list={Object.values(LOVE_LANGUAGE)}
          />
          <FormRow
            labelText={t("yearEmployed")}
            type="text"
            name="yearEmployed"
            placeholder={t("yearEmployedPlaceholder")}
            defaultValue={user.yearEmployed}
          />
          <FormRow
            labelText={t("hometown")}
            type="text"
            name="hometown"
            defaultValue={user.hometown}
            placeholder={t("hometownPlaceholder")}
          />
          <FormRow
            labelText={t("celebrityCrush")}
            type="text"
            name="celebrityCrush"
            defaultValue={user.celebrityCrush}
            placeholder={t("celebrityCrushPlaceholder")}
          />
          <div className="form-row">
            <ImageCropper
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <div className="text-area">
            <label htmlFor="aboutMe" className="text-label">
              {t("aboutMe")}
            </label>
            <textarea
              className="text-input"
              id="aboutMe"
              name="aboutMe"
              placeholder={t("aboutMePlaceholder")}
              value={aboutMe}
              onChange={handleAboutMeChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
        </div>
      </Form>
      <Form method="post" action="../delete-account">
        <button type="submit" className="delete-btn">
          {t("deleteProfile")}
        </button>
      </Form>
    </Wrapper>
  );
};

export default EditProfile;

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  padding: 3rem 2rem 4rem;

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 2rem;
    max-width: 100%;
    width: 100%;
  }

  .form-center {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .form-row {
    margin-bottom: 3rem;
    color: rgba(0, 0, 0, 0.7);
    .form-label {
      font-weight: 700;
      font-size: 1.3rem;
      min-width: 35ch;
    }
    .form-input {
      font-size: 1.3rem;
      width: 100%;
      height: 45px;
      background-color: var(--off-white);
      border-radius: 5px;
      border-style: none;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  .text-area {
    margin-bottom: 3rem;
    color: rgba(0, 0, 0, 0.7);
  }

  .text-label {
    font-weight: 700;
    text-transform: capitalize;
    color: rgba(0, 0, 0, 0.7);
    display: block;
    margin-bottom: 7px;
    font-size: 1.3rem;
  }

  .text-input {
    font-size: 1.3rem;
    padding-left: 1rem;
    width: 100%;
    height: 120px; /* Increased height for text area */
    background-color: var(--off-white);
    border-radius: 5px;
    border-style: none;
    resize: none;
  }

  .form-btn {
    grid-column: 3/4;
    margin-top: -0.6rem;
    align-self: center;
    display: grid;
    place-items: center;
    &:hover {
      background-color: var(--dark-blue);
      color: #ffffff;
    }
  }

  .delete-btn {
    background: none;
    border: none;
    color: var(--off-black);
    cursor: pointer;
    padding: 0;
    &:hover {
      transform: scale(1.2);
      color: var(--red);
    }
  }

  @media (max-width: 1280px) {
    padding: 3rem 1rem 4rem;
    .form-row .form-label {
      min-width: 20ch;
    }
  }

  @media (max-width: 1024px) {
    .form-center {
      grid-template-columns: repeat(2, 1fr);
    }
    .form-btn {
      grid-column: 2/3;
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 0.5rem 4rem;
    .form-center {
      grid-template-columns: 1fr;
    }
    .form-btn {
      grid-column: 1/2;
      width: 100%;
    }
  }
`;
