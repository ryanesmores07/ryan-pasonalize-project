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

import Calendar from "./Calendar";
import customFetch from "../utils/customFetch";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const EditEvent = ({ item }) => {
  const { _id: id, event, dateTime, description, createdBy } = item;
  return (
    <Wrapper>
      <Dialog.Root>
        <Dialog.Trigger>
          <IconButton
            radius="full"
            size="1"
            type="submit"
            color="indigo"
            variant="soft"
            style={{ cursor: "pointer" }}
          >
            <FiEdit3 />
          </IconButton>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px" style={{ overflow: "visible" }}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description>

          {/* Update Event API CALL */}
          <Form method="patch" action={`../edit-event/${id}`}>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Title
                </Text>
                <TextField.Root
                  name="event"
                  defaultValue={event}
                  placeholder="Enter your full name"
                />
              </label>
              <Box>
                <Text as="div" size="2" mb="1" weight="bold">
                  Time and Date
                </Text>
                <Calendar
                  type="date"
                  name="dateTime"
                  id="dateTime"
                  labelText="time and date"
                  defaultValue={dateTime}
                />
              </Box>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Description
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
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button type="submit">Save</Button>
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
