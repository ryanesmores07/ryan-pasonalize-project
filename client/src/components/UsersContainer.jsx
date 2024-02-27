import User from "./User";
import styled from "styled-components";
import { useAllUsersContext } from "../pages/AllUsers";

const UsersContainer = () => {
  const {
    data: { users },
  } = useAllUsersContext();
  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No users to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="users">
        {users.map((user) => {
          return <User key={user._id} {...user} />;
        })}
      </div>
    </Wrapper>
  );
};
export default UsersContainer;

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .users {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .users {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
