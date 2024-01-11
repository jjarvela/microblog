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
        "aria-[current=page]:bg-primary-gradient flex h-full items-center border-b border-black25 p-4 last:border-b-0 dark:border-white25" +
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
