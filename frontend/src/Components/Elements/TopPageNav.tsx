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
        <div className="flex items-center gap-2">
          <Icon style={{ width: "25px", height: "25px" }} />
          <h5>{linkName}</h5>
        </div>
      </NavLink>
    </nav>
  );
}
