import styled from "styled-components";

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  isRequired,
  placeholder,
  onChange,
}) => {
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
          placeholder={placeholder}
          required={isRequired}
          onChange={onChange}
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
      font-size: 1.6rem;
    }
    .form-input {
      font-size: 1.6rem;
      padding-left: 1rem;
      /* width: 100%; */
      height: 45px;
      background-color: var(--light-blue);
      border-radius: 5px;
      border-style: none;
    }
  }

  @media (min-width: 1024px) {
    .form-row {
      .form-input {
      }
    }
  }
`;
