import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/LandingPage/bg-hero.png";
import smallImage from "../assets/images/LandingPage/three-small-images.png";
import { useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

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
              Meet other members of other departments in the company. <br />
              Make new friends and mingle!
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
              onClick={handleLoginClick}
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
  overflow-x: hidden; /* Hide horizontal overflow */
  .container {
    min-height: 100vh; /* Use viewport height */
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${heroImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .left-section {
      width: 50%;
      margin-left: 12rem;
      margin-top: 30rem;
      .text-container {
        h2 {
          max-width: 70%;
          font-size: 4.5rem;
          font-weight: var(--font-weight-black);
        }
        h1 {
          color: var(--red);
          font-size: 7rem;
          font-weight: var(--font-weight-black);
        }
        .divider::before {
          content: "";
          display: block;
          margin-top: 0.4rem;
          height: 5px;
          width: 26rem;
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
        gap: 2rem;
        margin-top: 5.5rem;
        .register-btn,
        .login-btn {
          font-size: 1.6rem;
          width: 17rem;
          height: 5.6rem;
          border-radius: 50rem;
          border-style: none;
          font-weight: 600;
          font-family: "Montserrat";
          cursor: pointer;
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .register-btn {
          background-color: var(--blue);
          color: #ffffff;
          &:hover {
            background-color: var(--dark-blue);
            color: #ffffff;
          }
        }

        .login-btn:hover {
          background-color: var(--dark-blue);
          border-color: var(--blue);
          color: #ffffff;
        }
      }

      .small-image-and-text-container {
        gap: 1rem;
        margin-top: 13rem;
        margin-bottom: 10rem;
        display: flex;
        align-items: center;
        padding-bottom: 3rem;

        .small-image {
          width: 120px;
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

  @media screen and (max-width: 1024px) {
    .container {
      flex-direction: column;
      align-items: stretch;

      .left-section {
        margin-left: 3rem;
        .text-container {
          h2 {
            max-width: 90%;
          }
        }
        .buttons {
          gap: 2rem;
          margin-top: 3rem;
        }
        .small-image-and-text-container {
          margin-top: 8rem;
        }
      }
      .right-section {
        width: 100%;
        justify-content: center;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      min-width: auto;
      padding: 2rem;
    }
    .left-section {
      margin-top: 3rem;
      .text-container {
        h2 {
          font-size: 3.5rem;
        }
        h1 {
          font-size: 6rem;
        }
        p {
          font-size: 1.7rem;
        }
      }
      .buttons {
        margin-top: 3rem;
      }
      .small-image-and-text-container {
        margin-top: 6rem;
      }
    }
  }
`;

export default Landing;
