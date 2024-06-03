import { Link, Form, redirect } from "react-router-dom";
import { FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import styled from "styled-components";
import bgImage from "../assets/images/RegisterAndLoginPage/blue-blob-bg.png";
import logo from "../assets/images/RegisterAndLoginPage/pasonalize.png";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");

    if (data) {
      return redirect("/dashboard");
    }
  } catch (error) {
    return null;
  }
};

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
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
      <div className="container">
        <Form method="post" className="form">
          <img src={logo} alt="logo" />
          <h4>Login</h4>
          <FormRow name="email" type="email" />
          <FormRow name="password" type="password" />
          <SubmitBtn />
          <p>
            Not a member yet?
            <Link to="/register">
              <span style={{ color: "var(--blue)" }}> Register</span>
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
      align-items: stretch;
      gap: 18px;
      background-color: #ffffff;
      box-shadow: inset 0 4px 0 0 #b60005;
      border-radius: 5px;

      img {
        margin: 0 auto;
        width: 16rem;
      }

      h4 {
        margin: 0 auto;
        font-size: 3.5rem;
        font-weight: 400;
      }
      p {
        font-size: 1.5rem;
        align-self: center;
      }
    }
  }

  @media (max-width: 768px) {
    .container {
      .form {
        max-width: 90%;
        top: 150px;
        padding: 20px;

        img {
          width: 12rem;
        }

        h4 {
          font-size: 2.5rem;
        }

        p {
          font-size: 1.2rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .container {
      .form {
        max-width: 95%;
        top: 100px;
        padding: 15px;

        img {
          width: 10rem;
        }

        h4 {
          font-size: 2rem;
        }

        p {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Login;
