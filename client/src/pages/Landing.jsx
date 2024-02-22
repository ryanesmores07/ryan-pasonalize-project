import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/images/LandingPage/main-image.png";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="container">
        <div className="left-section">
          <div className="text-container">
            <h2>LET YOUR PEERS GET TO KNOW YOU MORE WITH</h2>
            <h1>PASONALIZE</h1>
            <div className="divider"></div>
            <p>
              Meet other members from other departments in the company. Make new
              friends and mingle!
            </p>
          </div>
          <div className="buttons">
            <button
              className="register-btn"
              type="button"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
            <button
              className="login-btn"
              type="button"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </div>
        </div>
        <div className="right-section">
          <div className="image-container">
            <img src={heroImage} alt="hero-image" className="hero-image" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  max-width: 1440px;
  .container {
    margin: 161px 120px;
    display: flex;
    gap: 42px;
    justify-content: center;
    /* background-color: lightyellow; */

    .left-section {
      width: 50%;
      .text-container {
        h2 {
          max-width: 45ch;
          font-size: 4.5rem;
          font-weight: var(--font-weight-black);
        }
        h1 {
          color: var(--red);
          font-size: 8rem;
          font-weight: var(--font-weight-black);
        }
        .divider::before {
          content: "";
          display: block;
          margin-top: 0.4rem;
          height: 5px;
          width: 261px;
          background-color: var(--red);
        }
        p {
          max-width: 527px;
          margin-top: 1.4rem;
          font-size: 1.9rem;
        }
      }
      .buttons {
        display: flex;
        gap: 3rem;
        margin-top: 5.5rem;
        .register-btn,
        .login-btn {
          width: 183px;
          height: 5.6rem;
          border-radius: 50rem;
        }
        .register-btn {
          color: #ffffff;
          background-color: var(--blue);
          font-weight: 600;
        }
      }
    }
    .right-section {
      width: 50%;
      .image-container {
        max-width: 595px;
        height: 639px;
      }
    }
  }
`;

export default Landing;
