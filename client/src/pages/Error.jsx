import { Link, useRouteError } from "react-router-dom";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! Page not found</h3>
          <p>We can't seem to find the page you are looking for</p>
          <Link to="/">Back home</Link>
        </div>
      </>
    );
  }

  console.log(error);
  return (
    <div>
      <h1>Something went wrong</h1>
      <Link to="/">Back home</Link>
    </div>
  );
};
export default Error;
