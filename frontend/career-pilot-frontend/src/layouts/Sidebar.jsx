import {
  FiLayout,
  FiTarget,
  FiBriefcase,
  FiFileText,
  FiFile,FiUser
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: FiLayout,
    },{  path: "/profile",
  label: "Profile",

  icon: FiUser ,
},
    {
      path: "/companies",
      label: "Companies",
      icon: FiBriefcase,
    },
    {
      path: "/applications",
      label: "Applications",
      icon: FiFileText,
    },
    {
      path: "/resume",
      label: "Resume",
      icon: FiFile,
    },
    {
      path: "/goals",
      label: "Goals",
      icon: FiTarget,
    },{
    path: "/problems",
    label: "Problems",
    icon: FiCode,
}
  ];

  return (
    <nav className="w-64 bg-white border-r h-screen p-4">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center p-3 rounded-xl mb-2 ${
              isActive
                ? "bg-orange-50 text-orange-600"
                : "text-slate-600 hover:bg-slate-50"
            }`
          }
        >
          <item.icon className="mr-3 w-5 h-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};