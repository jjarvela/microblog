import { NavLink } from "react-router-dom";

type ProfileButtonProps = {
  class?: string;
  children?: React.ReactNode;
  to: string;
};

function ProfileButton({ class: classAdd, children, to }: ProfileButtonProps) {
  return (
    <NavLink
      className={
        "aria-[current=page]:bg-primary-gradient flex h-full w-full items-center border-b border-black25 p-4 hover:bg-black25 aria-[current=page]:text-white dark:border-white25 dark:hover:bg-white25 aria-[current=page]:dark:text-black" +
        " " +
        classAdd
      }
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default ProfileButton;
