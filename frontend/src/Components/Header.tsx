import { NavLink } from "react-router-dom";
import { useBreakpoint } from "../Hooks/BreakpointHook";
import { Link } from "react-router-dom";
import { useUser } from "../UserWrapper";

function Header() {
  const { isXs } = useBreakpoint("xs");
  const { isSm } = useBreakpoint("sm");
  const user = useUser();
  return (
    <header className="flex w-full flex-row items-center justify-between bg-primary">
      <h1 className="mx-auto whitespace-nowrap py-2 font-heading text-xl font-bold text-white xs:mx-0 xs:pl-8 sm:text-2xl mid:py-3 mid:text-3xl">
        <NavLink to={"/home"}>
          <span className="font-light">µB</span>
          {isXs && " Microblog"}
        </NavLink>
      </h1>
      {user.user && (
        <div className="flex flex-row items-center gap-4">
          {isSm && (
            <div className="flex flex-col">
              <span className="text-md">Logged in as:</span>
              <span className="text-md">{user.user?.userName}</span>
            </div>
          )}
          <Link
            to={"/"}
            className="mr-5 rounded-xl border border-white bg-white bg-opacity-0 px-3 py-2 transition-all hover:bg-opacity-25"
            onClick={() => user.onLogout()}
          >
            Log out
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
