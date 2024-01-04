import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

function TopbarLink(props: { to: string; text: string; icon?: ReactNode }) {
  return (
    <NavLink
      to={props.to}
      // The aria-[current=page] selector is standing in for the active class feature of NavLink.
      className="border-b-1 
                flex 
                w-full 
                flex-row 
                items-center 
                gap-2
                border-black50 
               p-4 
               text-black75
               hover:bg-black25
               aria-[current=page]:bg-black25
              aria-[current=page]:text-white 
              dark:border-white50
              dark:text-white 
              dark:hover:bg-black75
              dark:aria-[current=page]:text-black
              "
    >
      <span className="text-xl">{props.icon}</span>
      <h5>{props.text}</h5>
    </NavLink>
  );
}

export default TopbarLink;
