import { useContext, useEffect, useState } from "react";
import { ProfilePicture } from "./ProfilePicture";
import InReplyTo from "./InReplyTo";
import MaterialSymbolsFavoriteOutlineRounded from "../Icons/MaterialSymbolsFavoriteOutlineRounded";
import MaterialSymbolsShareOutline from "../Icons/MaterialSymbolsShareOutline";
import MaterialSymbolsChatOutlineRounded from "../Icons/MaterialSymbolsChatOutlineRounded";
import MaterialSymbolsFlagRounded from "../Icons/MaterialSymbolsFlagRounded";
import Button from "./Button";
import { MaterialSymbolsChevronLeftRounded } from "../Icons/MaterialSymbolsChevronLeftRounded";
import { MaterialSymbolsChevronRightRounded } from "../Icons/MaterialSymbolsChevronRightRounded";
import { PostContext } from "./Post";

type MediaViewerProps = {
  active: Media;
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
};

export default function MediaViewer({ active, refObject }: MediaViewerProps) {
  const post = useContext(PostContext);
  const [activeMedia, setActiveMedia] = useState(active);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    post.media &&
      setActiveIndex(post.media.map((item) => item.id).indexOf(active.id));
  }, []);

  function togglePreviousMedia() {
    if (post.media && activeIndex > 0) {
      const current = activeIndex;
      setActiveMedia(post.media[current - 1]);
      setActiveIndex(current - 1);
    }
  }

  function toggleNextMedia() {
    if (post.media && activeIndex < post.media.length - 1) {
      const current = activeIndex;
      setActiveMedia(post.media[current + 1]);
      setActiveIndex(current + 1);
    }
  }

  return (
    <dialog
      ref={refObject}
      className="h-screen rounded-xl border border-black50 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50  dark:text-white"
    >
      <div className="flex h-full w-full flex-row">
        <div className="relative flex-grow bg-[#000]">
          {
            /*Display arrows if there is more than one piece of media associated to the post*/
            post.media && post.media.length > 1 && (
              <div className="absolute left-0 flex h-full w-full justify-between text-4xl">
                <a
                  className="z-50 cursor-pointer self-center opacity-25  hover:opacity-70"
                  onClick={() => togglePreviousMedia()}
                >
                  {activeIndex > 0 && <MaterialSymbolsChevronLeftRounded />}
                </a>
                <a
                  className="z-50 cursor-pointer self-center opacity-25  hover:opacity-70"
                  onClick={() => toggleNextMedia()}
                >
                  {activeIndex < post.media.length - 1 && (
                    <MaterialSymbolsChevronRightRounded />
                  )}
                </a>
              </div>
            )
          }
          {activeMedia.type === "img" ? (
            <img
              id={activeMedia.id}
              src={activeMedia.source}
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                margin: "auto",
              }}
            />
          ) : (
            <video
              id={activeMedia.id}
              src={activeMedia.source}
              controls
              muted
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                margin: "auto",
              }}
            />
          )}
        </div>
        <div className="flex h-full flex-col bg-white px-3 py-1 dark:bg-black">
          <Button
            class="btn-primary my-1 w-fit self-end"
            type="button"
            onClick={() => refObject.current?.close()}
          >
            <p>Close</p>
          </Button>
          <div className="mx-1 border-b-2 border-black25 dark:border-white25">
            <div className="flex flex-row items-center gap-4">
              <ProfilePicture width={80} image={post.profileImage} />
              <h5>{post.profileName}</h5>
              <p className="text-black50">{post.postOwner}</p>
              <small className="ml-auto mr-3 self-start">
                {post.time.toLocaleString()}
              </small>
            </div>
            {post.replyingTo ? (
              <div className="-mx-3 mt-4 flex flex-row justify-start border-y border-black25 px-4 py-4 dark:border-white25">
                <InReplyTo username={post.replyingTo} />
              </div>
            ) : null}

            <div className="m-6 flex flex-col gap-2">
              <div>{post.text}</div>

              <p className="flex flex-row gap-4">
                {post.tags.map((val, i) => (
                  <a key={i}>{val}</a>
                ))}
              </p>
              <div className="flex flex-row justify-center gap-4 text-2xl">
                <MaterialSymbolsFavoriteOutlineRounded />
                <MaterialSymbolsShareOutline />
                <MaterialSymbolsChatOutlineRounded />
                <MaterialSymbolsFlagRounded />
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
