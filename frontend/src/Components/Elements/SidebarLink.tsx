import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

function SidebarLink(props: { to: string; text: string; icon?: ReactNode }) {
  return (
    <NavLink
      to={props.to}
      // The aria-[current=page] selector is standing in for the active class feature of NavLink.
      className="flex 
                w-full 
                flex-row 
                items-center 
                gap-4 
                border-b-2
                p-4 
               border-black50 
               dark:border-white
               text-black75
               dark:text-white
              hover:bg-black25 
              dark:hover:bg-black75
              aria-[current=page]:bg-primary-gradient 
              aria-[current=page]:text-white
              dark:aria-[current=page]:text-black
              "
    >
      <span className="text-xl">{props.icon}</span>
      <h5>{props.text}</h5>
    </NavLink>
  );
}

export default SidebarLink;
