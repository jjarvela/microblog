import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useBreakpoint } from "../../Hooks/BreakpointHook";

function SidebarLink(props: { to: string; text: string; icon?: ReactNode }) {
  const { isMd } = useBreakpoint("md");
  return (
    <NavLink
      to={props.to}
      // The aria-[current=page] selector is standing in for the active class feature of NavLink.
      className="aria-[current=page]:bg-primary-gradient 
                flex 
                w-full
                flex-row
                items-center
                justify-center
                gap-4
                border-b-2
                border-black50
                px-0 
                py-3
               text-black75
               hover:bg-black25
               aria-[current=page]:text-white
               dark:border-white50
              dark:text-white 
              dark:hover:bg-black75
              dark:aria-[current=page]:text-black 
              md:w-full
              md:justify-normal
              md:px-4
              mid:py-4
              "
    >
      <span className="text-xl">{props.icon}</span>
      {isMd && <h5>{props.text}</h5>}
    </NavLink>
  );
}

export default SidebarLink;
