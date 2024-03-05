import { FormRow, FormRowSelect } from "../components";
import { useLoaderData } from "react-router-dom";
import {
  JOB_DEPARTMENT,
  JOB_POSITION,
  JOB_BRANCH,
  ZODIAC_SIGN,
  BLOOD_TYPE,
  LOVE_LANGUAGE,
} from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import day from "dayjs";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import { useState } from "react";



export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/dashboard");
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const file = formData.get("avatar");
  if (file && file.size > 2 * 1024 * 1024) {
    // 5MB limit
    toast.error(
      "Image size too large. Please select an image smaller than 5MB."
    );
    return null;
  }

  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully");
    return redirect("/profile");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const EditProfile = () => {
  const isRequired = false;
  const { user } = useLoaderData();
  const [aboutMe, setAboutMe] = useState(user.aboutMe);
  const date = day(user.createdAt).format("YYYY");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Edit Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <div className="image-upload-container">
              <label htmlFor="avatar" className="form-label">
                Select an image file (max 2MB):
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="form-input"
                accept="image/*"
              />
            </div>
          </div>
          <FormRow
            type="text"
            name="firstName"
            labelText="first name"
            defaultValue={user.firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={user.lastName}
          />
          <FormRow
            labelText="email"
            type="email"
            name="email"
            defaultValue={user.email}
          />
          <FormRowSelect
            name="jobBranch"
            labelText="branch"
            defaultValue={user.jobBranch}
            list={Object.values(JOB_BRANCH)}
          />
          <FormRowSelect
            name="jobDepartment"
            labelText="team"
            defaultValue={user.jobDepartment}
            list={Object.values(JOB_DEPARTMENT)}
          />
          <FormRowSelect
            name="jobPosition"
            labelText="position"
            defaultValue={user.jobPosition}
            list={Object.values(JOB_POSITION)}
          />
          <FormRow
            labelText="favorite hobby"
            type="text"
            name="hobby"
            placeholder="karaoke"
            defaultValue={user.hobby}
            isRequired={isRequired}
          />
          <FormRowSelect
            name="zodiacSign"
            labelText="zodiac sign"
            defaultValue={user.zodiacSign}
            list={Object.values(ZODIAC_SIGN)}
          />
          <FormRowSelect
            name="bloodType"
            labelText="blood type"
            defaultValue={user.bloodType}
            list={Object.values(BLOOD_TYPE)}
          />
          <FormRowSelect
            name="loveLanguage"
            labelText="love language"
            defaultValue={user.loveLanguage}
            list={Object.values(LOVE_LANGUAGE)}
          />
          <FormRow
            labelText="year joined"
            type="text"
            name="yearEmployed"
            placeholder="2020"
            defaultValue={user.yearEmployed}
          />
          <div className="text-area">
            <label htmlFor="aboutMe" className="text-label">
              Tell us about yourself
            </label>
            <textarea
              className="text-input"
              id="aboutMe"
              name="aboutMe"
              placeholder="Tell us about yourself"
              defaultValue={aboutMe}
            />
          </div>
          <FormRow
            labelText="Birth Place"
            type="text"
            name="birthPlace"
            defaultValue={user.birthPlace}
            placeholder="Tokyo, Japan"
          />
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditProfile;

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 2rem;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 3rem;
    color: rgba(0, 0, 0, 0.7);
    .form-label {
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
    grid-column: 1/2;

    .text-label {
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
      height: 45px;
      background-color: var(--off-white);
      border-radius: 5px;
      border-style: none;
    }
  }

  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    /* grid-column: 3/4; */
    margin-top: -0.6rem;
    align-self: center;
    display: grid;
    place-items: center;
    &:hover {
      background-color: var(--dark-blue);
      color: #ffffff;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
