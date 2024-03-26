import { IoBarChartSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { TbUserEdit } from "react-icons/tb";

const links = [
  { text: "全員のユーザー", path: ".", icon: <FaPeopleGroup /> },
  { text: "チームユーザー数", path: "team-count", icon: <IoBarChartSharp /> },
  { text: "自己プロファイル編集", path: "edit-profile", icon: <TbUserEdit /> },
  // { text: "profile", path: "profile", icon: <ImProfile /> },
];

export default links;
