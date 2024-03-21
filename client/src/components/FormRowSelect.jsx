import styled, { keyframes } from "styled-components";

const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue = "",
  onChange,
  testUrl,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
        {testUrl && (
          <BlinkingSpan>
            <a href={testUrl} target="_blank" rel="noopener noreferrer">
              Take the test here❤️
            </a>
          </BlinkingSpan>
        )}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemValue) => {
          return (
            <option value={itemValue} key={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkingSpan = styled.span`
  font-weight: 700;
  color: var(--pink);
  animation: ${blink} 1s ease-in-out infinite;
`;
