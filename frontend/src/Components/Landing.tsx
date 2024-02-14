import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "./Elements/Button";
import TextInput from "./Elements/Inputs/TextInput";
import "./Landing.css";
import { useNavigate } from "react-router";
import { useUser } from "../UserWrapper";
import DropdownInput from "./Elements/Inputs/DropdownInput";
import { locationList } from "../globalData";

function Landing() {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [screenNameInput, setScreenNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [birthdayInput, setBirthdayInput] = useState("");
  const [locationInput, setLocationInput] = useState(locationList[0]);

  const [formErrorMessage, setFormErrorMessage] = useState("");

  const loginErrorDialog = useRef<HTMLDialogElement>(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const handleLogin = () => {
    user?.onLogin(usernameInput, passwordInput);
  };

  const handleRegister = () => {
    user?.onRegister(
      usernameInput,
      passwordInput,
      screenNameInput,
      emailInput,
      locationInput,
      new Date(birthdayInput),
    );
  };

  useEffect(() => {
    if (passwordInput !== passwordConfirmInput && register) {
      setFormErrorMessage("Passwords do not match!");
    } else {
      setFormErrorMessage("");
    }
  }, [passwordInput, passwordConfirmInput, register]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (register) {
      handleRegister();
      setLoginErrorMessage("Registeration failed!");
    } else {
      handleLogin();
      setLoginErrorMessage("Login failed!");
    }
    // navigate("/home");
  };

  useEffect(() => {
    if (user.loginStatus === "fail") {
      loginErrorDialog.current?.showModal();
    } else if (user.loginStatus === "success") {
      user.setLoginStatus("idle");
      navigate("/home");
    }
  }, [navigate, user, user.loginStatus]);

  return (
    <div className="h-full">
      <div className="landing-scroll fixed bottom-0 -z-10 h-full w-full bg-gradient-to-l from-primaryFrom to-primaryTo" />
      <div className="landing-scroll-2 fixed bottom-0 -z-20 h-full w-full bg-primary" />
      <div className="flex h-full min-h-fit w-full flex-row items-center justify-between">
        <h2 className="m-auto hidden break-words text-center md:block">
          Welcome to Microblog
        </h2>
        <div className="scrollbar-thin relative m-auto flex h-full w-full flex-col items-center justify-center overflow-y-scroll border-x border-black25 bg-white dark:border-black75 dark:bg-black md:mx-0 [@media(min-width:512px)]:w-[32rem]  ">
          <form
            className="absolute top-8 flex h-max flex-col justify-center gap-4 text-center md:min-w-[20rem] mid:top-auto"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <h3>{register ? "Sign up today!" : "Welcome back!"}</h3>
            <TextInput
              placeholder="Username"
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            {register && (
              <TextInput
                type="text"
                placeholder="Screen name"
                onChange={(e) => setScreenNameInput(e.target.value)}
              />
            )}
            {register && (
              <TextInput
                type="email"
                placeholder="Email"
                onChange={(e) => setEmailInput(e.target.value)}
              />
            )}
            <TextInput
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            {register && (
              <TextInput
                type="password"
                placeholder="Confirm password"
                onChange={(e) => setPasswordConfirmInput(e.target.value)}
              />
            )}
            {register && (
              <>
                <label htmlFor="birthday" className="[webkit] -mb-3 text-sm">
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  onChange={(e) => setBirthdayInput(e.target.value)}
                  placeholder="birthday"
                />
              </>
            )}
            {register && (
              <DropdownInput
                items={locationList}
                onChange={(v) => setLocationInput(v)}
              />
            )}
            {formErrorMessage && (
              <p className="text-center text-sm text-warning dark:text-warningDark">
                {formErrorMessage}
              </p>
            )}
            <Button
              type="submit"
              className="btn-primary"
              disabled={
                Boolean(formErrorMessage) || user.loginStatus === "loading"
              }
            >
              {register ? "Register" : "Log in"}
            </Button>
            <div className="h-16" />
            <h5>
              {register
                ? "Already have an account?"
                : "Don't have an account yet?"}
            </h5>
            <Button
              onClick={() => setRegister(!register)}
              className="btn-secondary"
              type="button"
            >
              {register ? "Log in" : "Register"}
            </Button>
            <div className="h-[10%]" />
          </form>
        </div>
      </div>
      <dialog
        ref={loginErrorDialog}
        className="rounded-xl border border-black50 bg-white p-8 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50 dark:bg-black dark:text-white"
      >
        <div className="flex flex-col items-center gap-8">
          <h4>{loginErrorMessage}</h4>
          <Button
            className="btn-primary w-fit"
            onClick={() => {
              loginErrorDialog.current?.close();
              user.setLoginStatus("idle");
            }}
          >
            Okay
          </Button>
        </div>
      </dialog>
    </div>
  );
}

export default Landing;
