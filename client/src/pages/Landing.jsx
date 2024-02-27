import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/LandingPage/bg-hero.png";
import smallImage from "../assets/images/LandingPage/three-small-images.png";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="container">
        <div className="left-section">
          <div className="text-container">
            <h2>
              LET YOUR <span style={{ color: "#35d67e" }}>PEERS</span> GET TO
              <span style={{ color: "#b092f0" }}> KNOW </span>YOU{" "}
              <span style={{ color: "#ffbf00" }}>MORE</span> WITH
            </h2>
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
          <div className="small-image-and-text-container">
            <img src={smallImage} alt="small-images" className="small-image" />
            <p>Create an account and know about each other’s interest!</p>
          </div>
        </div>
        <div className="right-section">
          <div className="image-container"></div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    min-height: 1024px;
    min-width: 1440px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${heroImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .left-section {
      width: 50%;
      margin-left: 120px;
      margin-top: 30rem;
      .text-container {
        h2 {
          max-width: 70%;
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
          font-size: 1.6rem;
          width: 183px;
          height: 5.6rem;
          border-radius: 50rem;
          border-style: none;
          font-weight: 600;
          font-family: "Montserrat";
          cursor: pointer;
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .register-btn {
          color: #ffffff;
          background-color: var(--blue);
        }
        .login-btn {
          border-color: var(--blue);
          border: 1.5px solid var(--blue);
          color: var(--blue);
          background-color: rgba(54, 169, 236, 0.05);
        }
      }

      .small-image-and-text-container {
        gap: 1rem;
        margin-top: 13rem;
        display: flex;
        align-items: center;
        .small-image {
        }
        p {
          font-size: 1.7rem;
        }
      }
    }
    .right-section {
      display: flex;
      justify-content: flex-end;
      width: 50%;
      .image-container {
      }
    }
  }
`;

export default Landing;
