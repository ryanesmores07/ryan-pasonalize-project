import {
  Dialog,
  Flex,
  Text,
  Button,
  TextField,
  TextArea,
  IconButton,
  Box,
} from "@radix-ui/themes";
import { FiEdit3 } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Calendar from "./Calendar";
import { Form } from "react-router-dom";
import styled from "styled-components";

const EditEvent = ({ item }) => {
  const { _id: id, event, dateTime, description, createdBy } = item;
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Dialog.Root>
        <Dialog.Trigger>
          <IconButton
            radius="full"
            size="2"
            type="submit"
            color="indigo"
            variant="soft"
            style={{ cursor: "pointer" }}
          >
            <FiEdit3 />
          </IconButton>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px" style={{ overflow: "visible" }}>
          <Dialog.Title>{t("editEvent")}</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {t("editEventDescription")}
          </Dialog.Description>

          {/* Update Event API CALL */}
          <Form method="patch" action={`../edit-event/${id}`}>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  {t("title")}
                </Text>
                <TextField.Root
                  name="event"
                  defaultValue={event}
                  placeholder="Enter your full name"
                />
              </label>
              <Box>
                <Text as="div" size="2" mb="1" weight="bold">
                  {t("timeAndDate")}
                </Text>
                <Calendar
                  type="date"
                  name="dateTime"
                  id="dateTime"
                  defaultValue={dateTime}
                />
              </Box>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  {t("description")}
                </Text>
                <TextArea
                  name="description"
                  defaultValue={description}
                  placeholder="Description"
                />
              </label>
            </Flex>
            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  {t("cancelButton")}
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button type="submit"> {t("saveButton")}</Button>
              </Dialog.Close>
            </Flex>
          </Form>
        </Dialog.Content>
      </Dialog.Root>
    </Wrapper>
  );
};
export default EditEvent;

const Wrapper = styled.section``;
