import { IoBarChartSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { TbUserEdit } from "react-icons/tb";

const links = [
  { text: "all members", path: ".", icon: <FaPeopleGroup /> },
  { text: "stats", path: "/stats", icon: <IoBarChartSharp /> },
  { text: "edit profile", path: ".", icon: <TbUserEdit /> },
  { text: "profile", path: ".", icon: <ImProfile /> },
];

export default links;