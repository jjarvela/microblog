import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="w-full flex-shrink">
      <h1 className="mid:text-3xl mid:py-3 bg-primary py-2 pl-8 font-heading text-2xl font-bold text-white">
        <NavLink to={"/"}>
          <span className="font-light">µB</span> Microblog
        </NavLink>
      </h1>
    </header>
  );
}

export default Header;
