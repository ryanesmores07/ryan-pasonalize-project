import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllUsersContext } from "../pages/AllUsers";
import { useEventsContext } from "../pages/Events";
import styled from "styled-components";

const PageBtnContainer = () => {
  const allUsersContext = useAllUsersContext();
  const eventsContext = useEventsContext();
  let context;

  if (allUsersContext) {
    context = allUsersContext.data;
  }

  if (eventsContext) {
    context = eventsContext.data;
  }

  const { numOfPages, currentPage } = context;

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    // First page
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // Dots
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    // One before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // Current Page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // One after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // Dots
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    // Last page
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;

const Wrapper = styled.section`
  height: 6rem;
  margin-top: 7rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: var(--off-white);
    border-radius: var(--border-radius);
    display: flex;
  }
  .page-btn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    color: var(--blue);
    border-radius: var(--border-radius);
    cursor: pointer;
    &:hover {
      background: var(--light-blue);
      border-color: transparent;
      border-radius: var(--border-radius);
    }
  }
  .active {
    background: var(--dark-blue);
    color: var(--off-white);
  }
  .prev-btn,
  .next-btn {
    background: var(--off-white);
    border-color: transparent;
    border-radius: var(--border-radius);
    width: 100px;
    height: 40px;
    color: var(--blue);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--dark-blue);
    color: var(--off-white);
    transition: var(--transition);
  }
  .dots {
    display: grid;
    place-items: center;
    cursor: text;
  }

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;
