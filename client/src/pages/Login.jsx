import { Link, Form, redirect } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import styled from "styled-components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/login", data);
    toast.success("Logged in successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper>
      <Form method="post">
        <h4>Login</h4>
        <FormRow name="email" type="email" />
        <FormRow name="password" type="password" />
        <SubmitBtn />
        <p>Not a member yet?</p>
        <Link to="/register">Register</Link>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Login;
