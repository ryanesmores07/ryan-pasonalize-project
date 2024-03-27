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
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        {/* <h4 className="form-title">Edit Profile</h4> */}
        <div className="form-center">
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
            type="text"
            name="nickname"
            labelText="nickname"
            defaultValue={user.nickname}
          />
          <FormRow
            labelText="email"
            type="email"
            name="email"
            defaultValue={user.email}
          />
          <FormRowSelect
            name="jobBranch"
            labelText="勤務先"
            defaultValue={user.jobBranch}
            list={Object.values(JOB_BRANCH)}
          />
          <FormRowSelect
            name="jobDepartment"
            labelText="チーム"
            defaultValue={user.jobDepartment}
            list={Object.values(JOB_DEPARTMENT)}
          />
          <FormRowSelect
            name="jobPosition"
            labelText="職位"
            defaultValue={user.jobPosition}
            list={Object.values(JOB_POSITION)}
          />
          <FormRow
            labelText="1番大好きな趣味"
            type="text"
            name="hobby"
            placeholder="e.g. karaoke"
            defaultValue={user.hobby}
            isRequired={isRequired}
          />
          <FormRowSelect
            name="zodiacSign"
            labelText="星座"
            defaultValue={user.zodiacSign}
            list={Object.values(ZODIAC_SIGN)}
          />
          <FormRowSelect
            name="bloodType"
            labelText="血液型"
            defaultValue={user.bloodType}
            list={Object.values(BLOOD_TYPE)}
          />
          <FormRowSelect
            testUrl="https://love-language.co/ja"
            name="loveLanguage"
            labelText="ラブランゲージ"
            defaultValue={user.loveLanguage}
            list={Object.values(LOVE_LANGUAGE)}
          />
          <FormRow
            labelText="入社年"
            type="text"
            name="yearEmployed"
            placeholder="e.g. 2020"
            defaultValue={user.yearEmployed}
          />
          <FormRow
            labelText="実家"
            type="text"
            name="hometown"
            defaultValue={user.hometown}
            placeholder="e.g. Tokyo, Japan"
          />
          <FormRow
            labelText="Celebrity Crush"
            type="text"
            name="celebrityCrush"
            defaultValue={user.celebrityCrush}
            placeholder="e.g. Ryan Gosling"
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
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
      <Form method="post" action={`../delete-account`}>
        <button type="submit" className="delete-btn">
          Delete Profile
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
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    position: relative;

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
      height: 45px;
      background-color: var(--off-white);
      border-radius: 5px;
      border-style: none;
    }
  }

  .form-center {
    display: grid;
    place-content: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
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
    margin-top: 2rem;
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
    padding: 3rem 1rem 4rem; /* Adjust padding for 1024px and below */
    .form-row .form-label {
      min-width: 20ch; /* Adjust min-width for 1024px and below */
    }
  }
  @media (max-width: 768px) {
    padding: 3rem 0.5rem 4rem; /* Adjust padding for 768px and below */
    .form-row .form-label {
      min-width: 15ch; /* Adjust min-width for 768px and below */
    }
  }
`;
