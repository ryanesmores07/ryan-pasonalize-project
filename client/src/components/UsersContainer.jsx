import User from "./User";
import styled from "styled-components";
import { useAllUsersContext } from "../pages/AllUsers";
import PageBtnContainer from "./PageBtnContainer";

const UsersContainer = () => {
  const {
    data: { users, totalUsers, numOfPages },
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
      <h5>
        {totalUsers} user{users.length > 1 && "s"} found
      </h5>
      <div className="users">
        {users.map((user) => {
          return <User key={user._id} {...user} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default UsersContainer;

const Wrapper = styled.section`
  margin-bottom: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    font-size: 2.5rem;
    margin-bottom: 5rem;
  }
  .users {
    display: grid;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .users {
      place-items: center;
      grid-template-columns: 1fr 1fr 1fr;
      row-gap: 7rem;
    }
  }
`;
