import styled from "styled-components";
import { Form, redirect } from "react-router-dom";
import { Calendar, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.post("/events", data);
      queryClient.invalidateQueries(["events"]);
      toast.success("Event added successfully");
      return redirect("/dashboard/events");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddEvent = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-center">
          <div>
            <FormRow
              type="text"
              name="event"
              labelText={t("event")}
              defaultValue=""
            />
            <Calendar
              type="date"
              name="dateTime"
              id="dateTime"
              labelText={t("timeAndDate")}
            />
          </div>
          <div className="text-area">
            <label htmlFor="description" className="text-label">
              {t("description")}
            </label>
            <textarea
              className="text-input"
              id="description"
              name="description"
              placeholder={t("description")}
              defaultValue=""
            />
          </div>
        </div>
        <SubmitBtn formBtn="formBtn" />
      </Form>
    </Wrapper>
  );
};
export default AddEvent;

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  padding: 3rem 2rem 4rem;

  .form {
    position: relative;
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
      font-weight: 700;
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
      font-weight: 700;
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
      resize: none;
    }
  }

  .form-center {
    display: grid;
    place-content: center;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .form-btn {
    display: grid;
    place-items: center;
    width: 300px;
    &:hover {
      background-color: var(--dark-blue);
      color: #ffffff;
    }
  }

  .delete-btn {
    background: none;
    margin-top: 2rem;
    border: none;
    color: var(--off-black);
    cursor: pointer;
    padding: 0;
    &:hover {
      transform: scale(1.2);
      color: var(--red);
    }
  }

  @media (max-width: 1024px) {
    padding: 3rem 1rem 4rem; /* Adjust padding for 1024px and below */
    .form-center {
      grid-template-columns: 1fr; /* Single column layout on medium screens */
      gap: 1rem;
    }
    .form-row .form-label {
      min-width: 20ch; /* Adjusted min-width for 1024px and below */
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 0.5rem 4rem; /* Adjust padding for 768px and below */
    .form-row .form-label {
      min-width: 15ch; /* Adjusted min-width for 768px and below */
    }
  }
`;
