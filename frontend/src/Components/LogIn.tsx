import Button from "./Elements/Button";

const LogIn = () => {
  return (
    <>
      <h2>This is the login page for visitors</h2>
      <Button class="btn-primary"><h3>Log in here!</h3></Button>
      <Button class="btn-secondary"><h5>Forgot password</h5></Button>

      <p>This is a <a href="" className="link">paragraph link</a></p>
    </>
  );
};

export default LogIn;
