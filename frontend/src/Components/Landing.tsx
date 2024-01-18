import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "./Elements/Button";
import TextInput from "./Elements/Inputs/TextInput";
import "./Landing.css";
import { useNavigate } from "react-router";
import { UserContext } from "../UserWrapper";
import DropdownInput from "./Elements/Inputs/DropdownInput";
import { locationList } from "../globalData";

function Landing() {
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [screenNameInput, setScreenNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [birthdateInput, setBirthdateInput] = useState("");
  const [locationInput, setLocationInput] = useState(locationList[0]);

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    userContext?.onLogin(usernameInput, passwordInput);
  };

  const handleRegister = () => {
    userContext?.onRegister(
      usernameInput,
      passwordInput,
      screenNameInput,
      emailInput,
      locationInput,
      new Date(birthdateInput),
    );
  };

  useEffect(() => {
    if (passwordInput !== passwordConfirmInput) {
      setErrorMessage("Passwords do not match!");
    } else {
      setErrorMessage("");
    }
  }, [passwordInput, passwordConfirmInput]);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (register) handleRegister();
    else handleLogin();
    navigate("/home");
  };

  return (
    <div className="h-full">
      <div className="landing-scroll fixed bottom-0 -z-10 h-full w-full bg-gradient-to-l from-primaryFrom to-primaryTo" />
      <div className="landing-scroll-2 fixed bottom-0 -z-20 h-full w-full bg-primary" />
      <div className="flex h-full min-h-[36rem] w-full flex-row items-center justify-between">
        <h2 className="m-auto hidden break-words text-center md:block">
          Welcome to Microblog
        </h2>
        <div className="m-auto flex h-full w-full flex-col items-center justify-center border-x border-black25 bg-white dark:border-black75 dark:bg-black md:m-0 [@media(min-width:512px)]:w-[32rem]  ">
          <form
            className="flex flex-col justify-center gap-4 text-center md:min-w-[20rem]"
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
              <input
                type="date"
                onChange={(e) => setBirthdateInput(e.target.value)}
              />
            )}
            {register && (
              <DropdownInput
                items={locationList}
                onChange={(v) => setLocationInput(v)}
              />
            )}
            {errorMessage && (
              <p className="text-center text-sm text-warning dark:text-warningDark">
                {errorMessage}
              </p>
            )}
            <Button
              type="submit"
              class="btn-primary"
              isDisabled={Boolean(errorMessage)}
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
              class="btn-secondary"
              type="button"
            >
              {register ? "Log in" : "Register"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing;
