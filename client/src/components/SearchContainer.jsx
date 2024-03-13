import { FormRow, FormRowSelect } from ".";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  JOB_BRANCH,
  JOB_DEPARTMENT,
  BLOOD_TYPE,
  USER_SORT_BY,
} from "../../../utils/constants";
import { useAllUsersContext } from "../pages/AllUsers";
import styled from "styled-components";

const SearchContainer = () => {
  const { searchValues } = useAllUsersContext();
  const { search, jobBranch, jobDepartment, bloodType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="branch"
            name="jobBranch"
            list={["all", ...Object.values(JOB_BRANCH)]}
            defaultValue={jobBranch}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="blood type"
            name="bloodType"
            list={["all", ...Object.values(BLOOD_TYPE)]}
            defaultValue={bloodType}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="job department"
            name="jobDepartment"
            list={["all", ...Object.values(JOB_DEPARTMENT)]}
            defaultValue={jobDepartment}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(USER_SORT_BY)]}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 2rem;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 3rem;
    color: rgba(0, 0, 0, 0.7);
    .form-label {
      font-size: 1.3rem;
      min-width: 35ch;
    }
    .form-input {
      font-size: 1.3rem;
      width: 100%;
      height: 45px;
      background-color: var(--off-white);
      border-radius: 5px;
      border-style: none;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .text-area {
    .text-label {
      text-transform: capitalize;
      color: rgba(0, 0, 0, 0.7);
      display: block;
      margin-bottom: 7px;
      font-size: 1.3rem;
    }

    .text-input {
      font-size: 1.3rem;
      padding-left: 1rem;
      width: 100%;
      height: 45px;
      background-color: var(--off-white);
      border-radius: 5px;
      border-style: none;
    }
  }

  .form-center {
    display: grid;
    row-gap: 2rem;
  }
  .form-btn {
    grid-column: 3/4;
    margin-top: -0.6rem;
    align-self: center;
    display: grid;
    place-items: center;
    &:hover {
      background-color: var(--dark-blue);
      color: #ffffff;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
