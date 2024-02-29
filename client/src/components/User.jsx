import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import JobInfo from "./JobInfo";
import { Form } from "react-router-dom";
import styled from "styled-components";
import avatarTemp from "../assets/images/UserPage/Ellipse1.png";

const User = ({ firstName, lastName, jobDepartment, _id, avatar }) => {
  return (
    <Wrapper>
      <div className="container">
        <div className="avatar-container">
          {avatar && <img src={avatar} alt="avatar" />}
          <img src={avatarTemp} alt="avatar" />
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
  .container {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    width: 281px;

    h3 {
      font-weight: 500;
      text-transform: capitalize;
      font-size: 2rem;
      margin-bottom: 9px;
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
`;
