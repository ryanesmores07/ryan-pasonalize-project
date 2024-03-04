import { useDashboardContext } from "../pages/Dashboard";
import { ImProfile } from "react-icons/im";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <>
      <div className="nav-links">
        {links.map((link) => {
          const { text, path, icon } = link;
          return (
            <NavLink
              to={path}
              key={text}
              onClick={isBigSidebar ? null : toggleSidebar}
              className="nav-link"
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
        <Link className="nav-link" to="/profile">
          <span className="icon">
            <ImProfile />
          </span>
          Profile
        </Link>
      </div>
    </>
  );
};

export default NavLinks;
