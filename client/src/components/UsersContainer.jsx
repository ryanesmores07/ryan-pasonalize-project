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
        <h2>表示するユーザーがいません...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h2>
        {totalUsers} User{totalUsers > 1 && "s"} Found
      </h2>
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
  padding: 3rem 0;

  h2 {
    margin-bottom: 2rem;
    text-transform: none;
  }

  & > h5 {
    font-weight: 700;
    color: var(--off-black);
    font-size: 2.5rem;
    margin-bottom: 5rem;
  }

  .users {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    .users {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 7rem;
    }
  }

  @media (max-width: 1024px) and (min-width: 768px) {
    .users {
      grid-template-columns: repeat(2, 1fr);
      row-gap: 5rem;
    }
  }

  @media (max-width: 768px) {
    h2 {
      margin-left: 2rem;
    }
    .users {
      grid-template-columns: 1fr;
    }
  }
`;
