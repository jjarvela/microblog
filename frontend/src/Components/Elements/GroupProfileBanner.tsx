import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";
import CatBanner from "./cat-banner.jpg";

function GroupProfileBanner() {
  return (
    <div className="relative h-60 bg-cover bg-center">
      <img
        src={CatBanner}
        alt="Profile Banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute -bottom-5 left-10 flex items-center gap-4 drop-shadow-md">
        <ProfilePicture width={150} />
        <h1>Group Name</h1>
      </div>
      <div className="absolute right-7 top-7 flex gap-5 ">
        <Button class="btn-primary">Follow</Button>
        <Button class="btn-primary">Request to Join</Button>
      </div>
    </div>
  );
}

export default GroupProfileBanner;
