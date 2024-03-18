import styled from "styled-components";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";

const ProfileLogoutContainer = ({ user, logoutUser }) => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user.avatar ? (
          <img src={user.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle className="icon-1" />
        )}
        {user?.firstName}
        <FaCaretDown className="icon-2" />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  );
};

export default ProfileLogoutContainer;

const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    width: 120px;
    height: 35px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
    &:hover {
      background-color: var(--dark-blue);
      color: #ffffff;
    }
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .icon-1,
  .icon-2 {
    font-size: 2rem;
  }
  .dropdown {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);
    background: var(--blue);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-size: 1.6rem;
    background: transparent;
    border-color: transparent;
    color: var(--off-white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
    &:hover {
      background-color: var(--dark-blue);
      color: #ffffff;
    }
  }
  @media (min-width: 768px) {
    .logout-btn {
      width: 150px;
      height: 40px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2.4rem;
    }
  }
`;
