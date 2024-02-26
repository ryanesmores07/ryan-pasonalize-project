import styled from "styled-components";

const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <Wrapper>
      <div className="form-row">
        <label className="form-label" htmlFor={name}>
          {labelText || name}
        </label>
        <input
          className="form-input"
          type={type}
          id={name}
          name={name}
          defaultValue={defaultValue || ""}
          required
        />
      </div>
    </Wrapper>
  );
};

export default FormRow;

const Wrapper = styled.section`
  .form-row {
    .form-label {
      text-transform: capitalize;
      color: rgba(0, 0, 0, 0.7);
      display: block;
      margin-bottom: 7px;
      font-size: 1.9rem;
    }
    .form-input {
      width: 380px;
      height: 45px;
      background-color: var(--light-blue);
      border-radius: 5px;
      border-style: none;
    }
  }
`;
