import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import avatarTemp from "../assets/images/UserPage/default.jpg";

const User = ({ firstName, lastName, jobDepartment, _id, avatar }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`../${_id}`);
  };
  return (
    <Wrapper>
      <div className="container" onClick={handleOnClick}>
        <div className="avatar-container">
          {avatar ? (
            <img src={avatar} alt="avatar" className="avatar" />
          ) : (
            <img src={avatarTemp} alt="avatar" className="avatar" />
          )}
        </div>
        <div className="name-position-container">
          <h3>
            {firstName} <br /> <span>{lastName}</span>
          </h3>
          {jobDepartment && <h4 className={jobDepartment}>{jobDepartment}</h4>}
          {!jobDepartment && <h4 className="default">not yet specified</h4>}
        </div>
      </div>
    </Wrapper>
  );
};
export default User;

const Wrapper = styled.article`
  display: flex;
  justify-content: center;
  margin: 1rem 0; /* Add margin to separate multiple users */

  .container {
    background-color: var(--light-blue);
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    width: 281px;
    padding: 1rem;
    box-shadow: var(--shadow-1);
    cursor: pointer;
    transition: transform 0.1s ease;

    &:hover {
      transform: scale(1.02);
      box-shadow: var(--shadow-2);
    }

    .avatar-container {
      box-shadow: var(--shadow-1);
      width: 80px;
      height: 100px;
      overflow: hidden;
    }

    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      transition: transform 0.2s ease-in;
    }

    h3 {
      font-weight: 500;
      text-transform: capitalize;
      font-size: 2rem;
      margin-bottom: 9px;
      span {
        font-weight: normal;
      }
    }

    .name-position-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .default {
      font-weight: 500;
      font-size: 1.5rem;
      margin-left: 14px;
      color: var(--off-white);

      &::after {
        content: "";
        position: relative;
        top: -21px;
        z-index: -1;
        left: -14px;
        height: 2.6rem;
        width: 145px;
        background-color: var(--red);
        border-radius: var(--border-radius);
        display: block;
      }
    }
  }

  @media (max-width: 768px) {
    justify-content: center; /* Ensure the component is centered on small screens */
  }
`;
