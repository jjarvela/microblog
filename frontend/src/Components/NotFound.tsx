import { useNavigate } from "react-router";
import Button from "./Elements/Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <h1>Content not found!</h1>
      <Button class="btn-primary" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
}

export default NotFound;
