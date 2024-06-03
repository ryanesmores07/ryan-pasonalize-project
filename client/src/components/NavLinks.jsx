import { useDashboardContext } from "../pages/Dashboard";
import { ImProfile } from "react-icons/im";
import getLinks from "../utils/links";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const { t } = useTranslation();
  const links = getLinks();

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
          {t("linksMyProfile")}
        </Link>
      </div>
    </>
  );
};

export default NavLinks;
