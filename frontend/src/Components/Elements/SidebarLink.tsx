import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

function SidebarLink(props: { to: string; text: string; icon?: ReactNode }) {
  return (
    <NavLink
      to={props.to}
      // The aria-[current=page] selector is standing in for the active class feature of NavLink.
      className="flex w-full flex-row items-center gap-4 border-b-2 border-black50 from-primaryFrom to-primaryTo p-4 font-heading text-lg text-black75 aria-[current=page]:bg-gradient-to-r aria-[current=page]:text-white"
    >
      <span className="text-3xl">{props.icon}</span>
      {props.text}
    </NavLink>
  );
}

export default SidebarLink;
