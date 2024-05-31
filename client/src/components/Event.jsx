import { useState } from "react";
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
import customFetch from "../utils/customFetch";

const Event = ({ data }) => {
  const [events, setEvents] = useState(data.events);
  const handleJoinEvent = async (eventId) => {
    try {
      const response = await customFetch.post(`/events/${eventId}/join`, {});
      const updatedUsersJoined = response.data;

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, usersJoined: updatedUsersJoined }
            : event
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  return (
    <Wrapper>
      <StyledTheme radius="small" hasBackground={false}>
        {data.events.map((item) => {
          const {
            _id: id,
            event,
            dateTime,
            description,
            createdBy,
            usersJoined,
          } = item;
          console.log(dateTime);
          const { firstName, lastName, avatar } = createdBy;
          const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

          return (
            <Box
              maxWidth="330px"
              height="132px"
              maxHeight="132px"
              key={id}
              className="box"
            >
              <Card>
                <Flex gap="2" align="center" justify="center">
                  <Avatar
                    size="4"
                    src={avatar}
                    radius="full"
                    fallback={initials}
                  />
                  <Box className="texts">
                    <Text as="div" size="2" weight="bold">
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
                        <StyledPopoverContent>
                          <StyledDescription>{description}</StyledDescription>
                          <Popover.Arrow width="10" height="5" />
                        </StyledPopoverContent>
                      </Popover.Portal>
                    </Popover.Root>
                    <Popover.Root>
                      <StyledPopoverTrigger>
                        <Text as="div" size="2" color="blue">
                          Users Joined ⬅
                        </Text>
                      </StyledPopoverTrigger>
                      <Popover.Portal>
                        <StyledPopoverContent>
                          {!usersJoined.length ? (
                            <StyledDescription>
                              No Joined Users..
                            </StyledDescription>
                          ) : (
                            usersJoined.map((user, index) => {
                              return (
                                <StyledDescription key={index}>
                                  {user.firstName}
                                </StyledDescription>
                              );
                            })
                          )}
                          <Popover.Arrow width="10" height="5" />
                        </StyledPopoverContent>
                      </Popover.Portal>
                    </Popover.Root>
                  </Box>
                  {/* Delete Event */}
                  <Box className="btn-container">
                    <div className="delete-edit">
                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          <IconButton
                            radius="full"
                            size="2"
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
                                <Button
                                  variant="solid"
                                  color="red"
                                  type="submit"
                                >
                                  Accept
                                </Button>
                              </Form>
                            </AlertDialog.Action>
                          </Flex>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                      {/* Edit Event */}
                      <EditEvent item={item} />
                    </div>
                    <Button onClick={() => handleJoinEvent(id)}>
                      Join
                      {/* <Link to={"../events"}>Join</Link> */}
                    </Button>
                  </Box>
                </Flex>
              </Card>
            </Box>
          );
        })}
      </StyledTheme>
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
  word-wrap: break-word;
  overflow-wrap: break-word;

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
  text-transform: capitalize;
`;

const StyledPopoverTrigger = styled(Popover.Trigger)`
  background-color: inherit;
  cursor: pointer;
`;

const StyledTheme = styled(Theme)`
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: start;
  place-items: center;

  .box {
    margin-bottom: 2rem;
  }

  .texts {
    max-width: 170px;
    text-transform: capitalize;
  }

  .delete-edit {
    display: flex;
    gap: 1rem;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: flex-end;
  }
`;
