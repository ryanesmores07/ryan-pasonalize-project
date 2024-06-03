import i18n from 'i18next';
import { IoBarChartSharp } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbUserEdit } from "react-icons/tb";
import { SlEvent } from "react-icons/sl";
import { MdOutlineAddAlert } from "react-icons/md";

const getLinks = () => [
  { text: i18n.t('links.users'), path: ".", icon: <FaPeopleGroup /> },
  { text: i18n.t('links.teamCount'), path: "team-count", icon: <IoBarChartSharp /> },
  { text: i18n.t('links.editProfile'), path: "edit-profile", icon: <TbUserEdit /> },
  { text: i18n.t('links.addEvent'), path: "add-event", icon: <MdOutlineAddAlert /> },
  { text: i18n.t('links.eventList'), path: "events", icon: <SlEvent /> },
];

export default getLinks;
