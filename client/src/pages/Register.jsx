import { Form, redirect, useNavigation, Link } from "react-router-dom";
import styled from "styled-components";
import { FormRow, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import bgImage from "../assets/images/RegisterAndLoginPage/blue-blob-bg.png";
import logo from "../assets/images/RegisterAndLoginPage/pasonalize.png";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <div className="container">
        <Form method="post" className="form">
          <img src={logo} alt="logo" />
          <h4>Register</h4>
          <FormRow type="text" name="firstName" labelText="name" />
          <FormRow type="text" name="lastName" labelText="last name" />
          <FormRow type="email" name="email" />
          <FormRow type="password" name="password" />
          <SubmitBtn />
          <p>
            Already a member?
            <Link to="/login" className="member-btn">
              <span style={{ color: "var(--blue)" }}> Login</span>
            </Link>
          </p>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    min-height: 1024px;
    max-width: 1440px;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .form {
      margin: 0 auto;
      padding: 38px 30px;
      max-height: 639px;
      max-width: 440px;
      display: flex;
      position: relative;
      top: 196px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 18px;
      background-color: #ffffff;
      box-shadow: inset 0 4px 0 0 #b60005;
      border-radius: 5px;

      h4 {
        font-size: 3.5rem;
        font-weight: 400;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Register;
