import { BiHome } from "react-icons/bi";
import { GoPackage } from "react-icons/go";
import { GrGallery, GrContactInfo } from "react-icons/gr";
import { IoMdContacts } from "react-icons/io";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { BsFillTagsFill } from "react-icons/bs";

export const navItems = [
  { title: "home", route: "/", Icon: BiHome },
  { title: "Available Jobs", route: "/available-jobs", Icon: GoPackage },
  { title: "Service providers", route: "/service-providers", Icon: GrGallery },
  // { title: "about us", route: "/about-us", Icon: GrContactInfo },
  { title: "contact us", route: "/contact-us", Icon: IoMdContacts },
];
