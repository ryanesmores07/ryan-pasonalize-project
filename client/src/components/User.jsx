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
          <img src={avatarTemp} alt="avatar" />
        </div>
        <div className="name-position-container">
          <h3>
            {firstName} <br /> <span>{lastName}</span>
          </h3>
          {jobDepartment && <h4>{jobDepartment}</h4>}
          <h4 className={"kintone"}>Kintone</h4>
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
    /* h4 {
      font-weight: 500;
      font-size: 1.5rem;
      margin-left: 14px;
      &::after {
        content: "";
        position: relative;
        top: -21px;
        z-index: -1;
        left: -14px;
        height: 2.6rem;
        width: 145px;
        background-color: var(--light-yellow);
        border-radius: 50rem;
        display: block;
      }
    } */

    .name-position-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;
