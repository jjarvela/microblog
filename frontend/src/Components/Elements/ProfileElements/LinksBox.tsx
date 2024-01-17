import { Link } from "react-router-dom";

type LinkBoxLink = {
  icon: React.ReactNode;
  text: string;
  url?: string;
};

type LinkBoxProps = {
  links: LinkBoxLink[];
  class?: string;
};

function LinkBoxProps({ links, class: classAdd }: LinkBoxProps) {
  return (
    <div className={"rounded-xl border border-black50 p-2" + " " + classAdd}>
      <h4 className="mb-2 text-center">Links</h4>
      {links.map((link, i) => {
        return (
          <Link
            to={link.url || ""}
            key={i}
            className="flex flex-row items-center gap-4 rounded-lg px-4 py-3 hover:bg-black25 dark:hover:bg-white25"
          >
            <span className="flex w-6 flex-row justify-center">
              {link.icon}
            </span>
            <p className="text-[1.2rem]">{link.text}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default LinkBoxProps;