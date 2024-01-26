import { useLocation } from "react-router";
import Button from "./Elements/Button";

export default function HashtagIndividual() {
  const location = useLocation();
  //extract the tag from the pathname
  const tag = location.pathname.substring(9);
  return (
    <div className="mx-auto">
      <div className=" flex justify-center gap-2">
        <h3 className="text-primary">#{tag}</h3>
        <Button class="btn-primary">Follow</Button>
      </div>
    </div>
  );
}
