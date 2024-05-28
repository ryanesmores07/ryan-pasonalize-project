import { IoBarChartSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbUserEdit } from "react-icons/tb";
import { SlEvent } from "react-icons/sl";
import { MdOutlineAddAlert } from "react-icons/md";

const links = [
  { text: "全員のユーザー", path: ".", icon: <FaPeopleGroup /> },
  { text: "チームユーザー数", path: "team-count", icon: <IoBarChartSharp /> },
  { text: "プロファイル編集", path: "edit-profile", icon: <TbUserEdit /> },
  { text: "Add Event", path: "add-event", icon: <MdOutlineAddAlert /> },
  { text: "Event List", path: "events", icon: <SlEvent /> },
];

export default links;
