import {
  Theme,
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  IconButton,
  AlertDialog,
  Button,
} from "@radix-ui/themes";
import { formatDate } from "../utils/formatDate";
import styled, { keyframes } from "styled-components";
import * as Popover from "@radix-ui/react-popover";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Form } from "react-router-dom";
import EditEvent from "./EditEvent";

const Event = ({ data }) => {
  return (
    <Wrapper>
      <StyledTeme radius="small" hasBackground={false}>
        {data.events.map((item) => {
          const { _id: id, event, dateTime, description, createdBy } = item;
          const { firstName, lastName, avatar } = createdBy;
          const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

          return (
            <Box maxWidth="300px" key={id} className="box">
              <Card>
                <Flex gap="3" align="center" justify="center">
                  <Avatar
                    size="4"
                    src={avatar}
                    radius="full"
                    fallback={initials}
                  />
                  <Box className="texts">
                    <Text as="div" size="3" weight="bold">
                      {event}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {formatDate(dateTime)}
                    </Text>

                    <Popover.Root>
                      <StyledPopoverTrigger>
                        <Text as="div" size="2" color="blue">
                          Event Info ⬅
                        </Text>
                      </StyledPopoverTrigger>
                      <Popover.Portal>
                        <StyledPopoverContent className="PopoverContent">
                          <StyledDescription>{description}</StyledDescription>
                          <Popover.Arrow width="10" height="5" />
                        </StyledPopoverContent>
                      </Popover.Portal>
                    </Popover.Root>
                  </Box>
                  {/* Delete Event */}
                  <Box className="delete-edit">
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <IconButton
                          radius="full"
                          size="1"
                          color="red"
                          variant="soft"
                          style={{ cursor: "pointer" }}
                        >
                          <RiDeleteBin5Line />
                        </IconButton>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete Event</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure you want to delete this event?
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Form
                              method="post"
                              action={`../delete-event/${id}`}
                            >
                              <Button variant="solid" color="red" type="submit">
                                Accept
                              </Button>
                            </Form>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                    {/* Edit Event */}
                    <EditEvent item={item} />
                  </Box>
                </Flex>
              </Card>
            </Box>
          );
        })}
      </StyledTeme>
    </Wrapper>
  );
};
export default Event;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.section``;

// Style for Popover.Content
const StyledPopoverContent = styled(Popover.Content)`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

  &[data-side="top"] {
    animation-name: ${slideUp};
  }
  &[data-side="bottom"] {
    animation-name: ${slideDown};
  }
`;

// Style for description paragraph
const StyledDescription = styled.p`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  line-height: 1.5;
  max-width: 300px;
`;

const StyledPopoverTrigger = styled(Popover.Trigger)`
  background-color: inherit;
  cursor: pointer;
`;

const StyledTeme = styled(Theme)`
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: start;
  place-items: center;

  .box {
    margin-bottom: 2rem;
  }

  .texts {
    width: 200px;
  }

  .delete-edit {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: flex-end;
  }
`;
