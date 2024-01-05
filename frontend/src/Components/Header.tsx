import { NavLink } from "react-router-dom";
import { useBreakpoint } from "../Hooks/BreakpointHook";

function Header() {
  const { isSm } = useBreakpoint("sm");
  return (
    <header className="w-full flex-shrink">
      <h1 className="bg-primary py-2 pl-8 font-heading text-xl font-bold text-white sm:text-2xl mid:py-3 mid:text-3xl">
        <NavLink to={"/"}>
          <span className="font-light">µB</span>
          {isSm && " Microblog"}
        </NavLink>
      </h1>
    </header>
  );
}

export default Header;
