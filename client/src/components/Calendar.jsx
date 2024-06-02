/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ id, type, name, labelText, defaultValue }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date(defaultValue || new Date())
  );
  return (
    <Wrapper>
      <div className="form-row">
        <label className="form-label" htmlFor={name}>
          {labelText}
        </label>
        <DatePicker
          className="form-input"
          type={type}
          showTimeSelect
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="Pp"
          placeholderText="Select a date and time"
          id={id}
          name={name}
        />
      </div>
    </Wrapper>
  );
};
export default Calendar;

const Wrapper = styled.section`
  display: inline-block;
  .form-row {
    .form-label {
      text-transform: capitalize;
      color: rgba(0, 0, 0, 0.7);
      margin-bottom: 7px;
      font-size: 1.3rem;
    }
    .form-input {
      font-size: 1.3rem;
      padding-left: 1rem;
      border-radius: 5px;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .form-row {
      .form-input {
        font-size: 1.1rem; /* Decrease font size on smaller screens */
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    .form-row {
      .form-input {
        font-size: 1.2rem; /* Adjust font size for medium-sized screens */
      }
    }
  }
`;
