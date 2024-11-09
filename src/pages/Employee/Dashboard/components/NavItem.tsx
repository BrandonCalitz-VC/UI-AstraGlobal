import { NavLink } from "react-router-dom";
import { IconType } from "react-icons/lib";

interface NavItemProps {
  to: string;
  Icon: IconType;
  title: string;
  variant: string;
}

enum NavItemVariant {
  "special" = "group-hover:from-blue-500 group-hover:to-purple-500",
  "employee" = "group-hover:from-orange-500 group-hover:to-yellow-500",
}

const NavItem = ({ to, Icon, title, variant = "special" }: NavItemProps) => {
  switch (variant) {
    case NavItemVariant.special:
      break;
    case NavItemVariant.employee:
      break;
  }
  return (
    <NavLink to={to} className="w-[90px] flex flex-col items-center group">
      <div
        className={`w-16 h-16 rounded-sm bg-white group-hover:bg-gradient-to-bl ${variant} flex justify-center items-center shadow-inner group-hover:shadow-lg transition-all duration-300`}
      >
        <Icon className="w-10 h-10 text-gray-400 group-hover:text-white transition-all duration-300" />
      </div>
      <span
        className={`mt-1 text-gray-600 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-bl ${variant} transition-all duration-300`}
      >
        {title}
      </span>
    </NavLink>
  );
};

export default NavItem;
