import { NavLink } from "react-router-dom";

type TopPageNavProps = {
  destination: string;
  linkName: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function TopPageNav({
  destination,
  linkName,
  icon: Icon,
}: TopPageNavProps) {
  return (
    <nav className="flex flex-row justify-center gap-0 border-b-[1px] border-primary">
      <NavLink
        to={destination}
        // The aria-[current=page] selector is standing in for the active class feature of NavLink.
        className="
        aria-[current=page]:bg-primary-gradient
                w-[15%]
                min-w-max
                border-x-[1px] 
                border-black50 
                p-2
                text-center
                text-black75
                hover:bg-black25
                aria-[current=page]:text-white 
                dark:text-white
                dark:hover:bg-black75
                dark:aria-[current=page]:text-black
                "
      >
        <div className="hidden items-center gap-2 sm:inline-flex">
          <Icon style={{ width: "30px", height: "30px" }} />
          <h5>{linkName}</h5>
        </div>

        <div className="flex flex-col items-center gap-2 sm:hidden">
          <Icon style={{ width: "25px", height: "25px" }} />
          <small>
            <p>{linkName}</p>
          </small>
        </div>
      </NavLink>
    </nav>
  );
}
