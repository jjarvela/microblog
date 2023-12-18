import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="col-span-full">
      <h1 className="bg-primary p-5 pl-8 font-heading text-3xl font-bold text-white">
        <NavLink to={"/"}>
          <span className="font-light">µB</span> Microblog
        </NavLink>
      </h1>
    </header>
  );
}

export default Header;
