/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

const Calendar = ({ id, type, name, labelText }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <Wrapper>
      <div className="form-row">
        <label className="form-label" htmlFor={name}>
          {labelText || name}
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
  .form-row {
    .form-label {
      text-transform: capitalize;
      color: rgba(0, 0, 0, 0.7);
      display: block;
      margin-bottom: 7px;
      font-size: 1.3rem;
    }
    .form-input {
      font-size: 1.3rem;
      padding-left: 1rem;
      border-radius: 5px;
    }
  }

  @media (min-width: 1024px) {
    .form-row {
      .form-input {
      }
    }
  }
`;
