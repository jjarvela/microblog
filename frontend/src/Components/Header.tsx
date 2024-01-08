import { NavLink } from "react-router-dom";
import { useBreakpoint } from "../Hooks/BreakpointHook";

function Header() {
  const { isSm } = useBreakpoint("sm");
  const { isXs } = useBreakpoint("xs");
  return (
    <header className="flex w-full flex-row bg-primary">
      {/* Extra margin for the sidebar menu button. */}
      {!isXs && <div className="w-14">&nbsp;</div>}{" "}
      <h1 className="flex-1 py-2 pl-8 font-heading text-xl font-bold text-white sm:text-2xl mid:py-3 mid:text-3xl">
        <NavLink to={"/"}>
          <span className="font-light">µB</span>
          {isSm && " Microblog"}
        </NavLink>
      </h1>
    </header>
  );
}

export default Header;
