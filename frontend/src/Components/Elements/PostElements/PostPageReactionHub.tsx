import LikeButton from "./LikeButton";
import RepostButton from "./RepostButton";
import MaterialSymbolsChatOutlineRounded from "../../Icons/MaterialSymbolsChatOutlineRounded";
import { ProfilePicture } from "../ProfilePicture";
import { useState } from "react";
import { MaterialSymbolsChevronRightRounded } from "../../Icons/MaterialSymbolsChevronRightRounded";
import { ResizableBox } from "react-resizable";
import { Link } from "react-router-dom";

export default function PostPageReactionHub() {
  const [showReactionList, setShowReactionList] = useState(false);
  const [innerNav, setInnerNav] = useState("likes");

  {
    /*height of the resizeable notification list*/
  }
  const [height, setHeight] = useState(100);

  const reactions: { likes: User[]; reposts: User[]; comments: User[] } = {
    likes: [
      {
        userName: "@anotheruser",
        screenName: "Another User 🙂",
        followers: 1,
        following: 37,
      },
      {
        userName: "@fancyuser",
        screenName: "Fancy User",
        followers: 526,
        following: 1893,
      },
      {
        userName: "@likeyuser",
        screenName: "Only Likes",
        followers: 1,
        following: 435,
      },
    ],
    reposts: [
      {
        userName: "@anotheruser",
        screenName: "Another User 🙂",
        followers: 1,
        following: 37,
      },
    ],
    comments: [],
  };

  return (
    <div className="mb-3 flex flex-col">
      <div className="flex flex-row items-center justify-center gap-4 border-y-[1px] border-solid border-black50 text-2xl">
        <span className="mx-2">{reactions.likes.length}</span>
        <LikeButton />
        <span className="mx-2">{reactions.reposts.length}</span>
        <RepostButton />
        <span className="mx-2">{reactions.comments.length}</span>
        <MaterialSymbolsChatOutlineRounded />
        <MaterialSymbolsChevronRightRounded
          className={`${
            showReactionList && "rotate-90"
          } cursor-pointer text-4xl transition-all delay-100 ease-linear`}
          onClick={() => setShowReactionList(!showReactionList)}
        />
      </div>
      <div className={`overflow-hidden ${!showReactionList && "h-0"}`}>
        <div className="flex flex-row justify-center border-b-[1px] border-solid border-primary">
          <div
            className={`cursor-pointer border-x-[1px] border-solid border-black50 p-1 ${
              innerNav === "likes" && "bg-primary dark:text-black"
            }`}
            onClick={() => setInnerNav("likes")}
          >
            <span>Likes</span>
          </div>
          <div
            className={`cursor-pointer border-x-[1px] border-solid border-black50 p-1 ${
              innerNav === "reposts" && "bg-primary dark:text-black"
            }`}
            onClick={() => setInnerNav("reposts")}
          >
            <span>Reposts</span>
          </div>
          <div
            className={`cursor-pointer border-x-[1px] border-solid border-black50 p-1 ${
              innerNav === "comments" && "bg-primary dark:text-black"
            }`}
            onClick={() => setInnerNav("comments")}
          >
            <span>Comments</span>
          </div>
        </div>
        {/*
        Axis: x, y or both
        Custom handle element: invisible, placed at the bottom of the div
        onResize event: requires (event, { element, size }) even though vscode cries about it
        */}
        <ResizableBox
          height={height}
          axis="y"
          handle={
            <div className="absolute bottom-0 mx-auto h-2 w-[95%] cursor-ns-resize"></div>
          }
          className="timeline-box scrollbar-thin relative my-2 flex flex-col overflow-y-auto px-4"
          onResize={(event, { element, size }) => {
            setHeight(size.height);
          }}
        >
          <div className="h-full w-full">
            {innerNav === "likes" &&
              reactions.likes.map((item) => {
                return (
                  <Link
                    to={`/user/${item.userName}/profile`}
                    className="flex gap-1"
                    key={Math.floor(Math.random() * 1000)}
                  >
                    <ProfilePicture width={20} />
                    <p>{item.screenName}</p>
                    <p>{item.userName}</p>
                  </Link>
                );
              })}

            {innerNav === "reposts" &&
              reactions.reposts.map((item) => {
                return (
                  <Link
                    to={`/user/${item.userName}/profile`}
                    className="flex gap-1"
                    key={Math.floor(Math.random() * 1000)}
                  >
                    <ProfilePicture width={20} />
                    <p>{item.screenName}</p>
                    <p>{item.userName}</p>
                  </Link>
                );
              })}

            {innerNav === "comments" &&
              reactions.comments.map((item) => {
                return (
                  <Link
                    to={`/user/${item.userName}/profile`}
                    className="flex gap-1"
                    key={Math.floor(Math.random() * 1000)}
                  >
                    <ProfilePicture width={20} />
                    <p>{item.screenName}</p>
                    <p>{item.userName}</p>
                  </Link>
                );
              })}
          </div>
        </ResizableBox>
      </div>
    </div>
  );
}
