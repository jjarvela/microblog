import { useState } from "react";
import Button from "./Elements/Button";
import TextInput from "./Elements/TextInput";
import "./Landing.css";
import { useNavigate } from "react-router";

function Landing() {
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div id="landing-backgrounds">
        <div className="absolute -z-30 h-full w-full bg-white" />
        <div className="landing-scroll absolute bottom-0 -z-10 h-full w-full bg-gradient-to-l from-primaryFrom to-primaryTo" />
        <div className="landing-scroll-2 absolute bottom-0 -z-20 h-full w-full bg-primary" />
      </div>
      <div className="flex h-full w-full flex-row items-center justify-between">
        <h2 className="m-auto hidden break-words text-center md:block">
          Welcome to Microblog
        </h2>
        <div className="m-auto flex h-full w-full flex-col items-center justify-center border-x border-black25 bg-white min-[500px]:w-[32rem] min-[500px]:w-fit md:m-0 md:mx-0">
          <form className="flex flex-col justify-center gap-4 text-center md:min-w-[20rem]">
            <h3>{register ? "Sign up today!" : "Welcome back!"}</h3>
            <TextInput placeholder="Username" />
            <TextInput type="email" placeholder="Email" />
            <TextInput type="password" placeholder="Password" />
            <TextInput type="password" placeholder="Confirm password" />
            <Button
              type="button"
              class="btn-primary"
              onClick={() => navigate("/home")}
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
