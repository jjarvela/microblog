import axios from "axios";
import { useRef } from "react";
import Button from "./Components/Elements/Button";
import { useNavigate } from "react-router";
import { useUser } from "./UserWrapper";

type AuthWrapperProps = {
  children: React.ReactNode;
};

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem("userId");
      if (window.location.pathname !== "/") {
        (
          document.getElementById("session-expire-dialog") as HTMLDialogElement
        ).showModal();
      }
      return;
    }
    return err;
  },
);

function AuthWrapper({ children }: AuthWrapperProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const user = useUser();

  return (
    <>
      {children}
      <dialog
        id="session-expire-dialog"
        ref={dialogRef}
        className="rounded-xl border border-black50 bg-white p-8 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
      >
        <div className="flex flex-col items-center gap-8">
          <h4>Unauthorized!</h4>
          <Button
            className="btn-primary w-fit"
            onClick={() => {
              navigate("/");
              dialogRef.current?.close();
              user.onLogout();
            }}
          >
            Return to Login
          </Button>
        </div>
      </dialog>
    </>
  );
}

export default AuthWrapper;
