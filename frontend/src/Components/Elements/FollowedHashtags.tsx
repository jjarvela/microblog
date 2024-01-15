import Button from "./Button";

export default function FollowedHashtags() {
  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <div className="flex w-max flex-col items-center border-b-[1px] border-black50 p-2 sm:flex-row sm:gap-5">
        <p>
          <a>#{"tag"}</a>
        </p>
        <small className=" text-black50">New Posts</small>
        <Button class="btn-primary w-fit">
          <small>Unfollow</small>
        </Button>
      </div>

      <div className="flex w-max flex-col border-b-[1px] border-black50 p-2 sm:flex-row sm:gap-5">
        <p>
          <a>#{"tag"}</a>
        </p>
        <small className=" text-black50">New Posts</small>
        <Button class="btn-primary w-fit">
          <small>Unfollow</small>
        </Button>
      </div>

      <div className="flex w-max flex-col border-b-[1px] border-black50 p-2 sm:flex-row sm:gap-5">
        <p>
          <a>#{"tag"}</a>
        </p>
        <small className=" text-black50">New Posts</small>
        <Button class="btn-primary w-fit">
          <small>Unfollow</small>
        </Button>
      </div>
    </div>
  );
}
