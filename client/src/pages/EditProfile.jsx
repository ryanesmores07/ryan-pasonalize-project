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
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch("/users/update-user", data);
    toast.success("User edited successfully");
    return redirect("/dashboard/profile");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditProfile = () => {
  const isRequired = false;
  const { user } = useLoaderData();
  const date = day(user.createdAt).format("YYYY");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
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
            defaultValue={user.yearEmployed}
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
      font-size: 1.5rem;
    }
    .form-input {
      font-size: 1.5rem;
      width: 100%;
      height: 45px;
      background-color: var(--off-white);
      border-radius: 5px;
      border-style: none;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    grid-column: 3/4;
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
