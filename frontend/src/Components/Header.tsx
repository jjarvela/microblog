import { NavLink } from "react-router-dom";
import { useBreakpoint } from "../Hooks/BreakpointHook";

function Header() {
  const { isXs } = useBreakpoint("xs");
  return (
    <header className="flex w-full flex-row bg-primary">
      <h1 className="mx-auto py-2 font-heading text-xl font-bold text-white xs:mx-0 xs:pl-8 sm:text-2xl mid:py-3 mid:text-3xl">
        <NavLink to={"/"}>
          <span className="font-light">µB</span>
          {isXs && " Microblog"}
        </NavLink>
      </h1>
    </header>
  );
}

export default Header;
