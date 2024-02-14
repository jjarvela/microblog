import { useContext, useEffect, useRef, useState } from "react";
import InReplyTo from "./InReplyTo";
import { MaterialSymbolsChevronLeftRounded } from "../../Icons/MaterialSymbolsChevronLeftRounded";
import { MaterialSymbolsChevronRightRounded } from "../../Icons/MaterialSymbolsChevronRightRounded";
import { PostContext } from "./Post";
import UserProfileInfo from "../UserProfileInfo";
import TagList from "./TagList";
import MaterialSymbolsCloseRounded from "../../Icons/MaterialSymbolsCloseRounded";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";
import RepostButton from "./RepostButton";
import CommentButton from "./CommentButton";
import PostCommentForm from "../../PostCommentForm";
import { useUser } from "../../../UserWrapper";

type MediaViewerProps = {
  active: Media;
  refObject: React.MutableRefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MediaViewer({
  active,
  refObject,
  isOpen,
  setIsOpen,
}: MediaViewerProps) {
  const post = useContext(PostContext);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const ids = post.media.map((item) => item.id);
  const [activeIndex, setActiveIndex] = useState(ids.indexOf(active.id));
  const [activeMedia, setActiveMedia] = useState(active);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const user = useUser();

  useEffect(() => {
    isOpen && setActiveMedia(active);
    isOpen && setActiveIndex(ids.indexOf(active.id));
  }, [isOpen]);

  function togglePreviousMedia() {
    if (activeIndex > 0) {
      const newIndex = activeIndex - 1;
      setActiveIndex(newIndex);
      setActiveMedia(post.media[newIndex]);
    }
  }

  function toggleNextMedia() {
    if (activeIndex < post.media.length - 1) {
      const newIndex = activeIndex + 1;
      setActiveIndex(newIndex);
      setActiveMedia(post.media[newIndex]);
    }
  }

  return (
    <dialog
      ref={refObject}
      className="scrollbar-thin h-screen rounded-xl border border-black50 backdrop:bg-[#000] backdrop:opacity-50 dark:border-white50  dark:text-white"
    >
      <div className=" flex h-full w-full flex-col lg:flex-row">
        <div className="relative max-h-[80%] flex-grow bg-[#000] lg:max-h-screen">
          {
            /*Display arrows if there is more than one piece of media associated to the post*/
            post.media && post.media.length > 1 && (
              <div className="absolute left-0 flex h-full w-full justify-between text-4xl">
                <a
                  className="z-50 cursor-pointer self-center opacity-25  hover:opacity-70"
                  onClick={() => togglePreviousMedia()}
                >
                  {ids.indexOf(activeMedia.id) > 0 && (
                    <MaterialSymbolsChevronLeftRounded />
                  )}
                </a>
                <a
                  className="z-50 cursor-pointer self-center opacity-25  hover:opacity-70"
                  onClick={() => toggleNextMedia()}
                >
                  {ids.indexOf(activeMedia.id) < post.media.length - 1 && (
                    <MaterialSymbolsChevronRightRounded />
                  )}
                </a>
              </div>
            )
          }
          {activeMedia.type === "img" ? (
            <>
              <div
                className="pointer-events-none absolute h-full w-full bg-cover bg-center opacity-50"
                style={{ backgroundImage: `url(${activeMedia.source})` }}
              />
              <img
                id={activeMedia.id}
                src={activeMedia.source}
                className="relative left-0 top-0 z-10 h-full w-full object-contain backdrop-blur-2xl"
              />
            </>
          ) : (
            <video
              ref={mediaRef}
              id={activeMedia.id}
              src={activeMedia.source}
              controls
              muted
              className="h-full w-full object-contain lg:h-full"
            />
          )}
        </div>
        <div className="flex h-full flex-col gap-4 bg-white px-3 py-1 dark:bg-black lg:min-w-[30em]">
          <div className="mx-[1em] border-b-2 border-black25 dark:border-white25">
            <div className="my-[1em] flex flex-row justify-between">
              <UserProfileInfo user={post.postOwner} />
              <Link
                to={`/${post.postOwner.userName.substring(1)}/post/${1}`}
                state={post}
              >
                <time className="my-[0.5em] text-center text-sm underline underline-offset-2">
                  {post.time.toLocaleString()}
                </time>
              </Link>
              <div
                className="mx-[1em] cursor-pointer self-start text-xl text-black50 lg:ml-[0.5em] lg:mr-0"
                onClick={() => {
                  setIsOpen(false);
                  mediaRef.current?.pause();
                  refObject.current?.close();
                }}
              >
                <MaterialSymbolsCloseRounded />
              </div>
            </div>
            {post.replyingTo ? (
              <div className="-mx-3 mt-4 flex flex-row justify-start border-y border-black25 px-4 py-4 dark:border-white25">
                <InReplyTo username={post.replyingTo} />
              </div>
            ) : null}

            <div className="m-6 flex flex-col gap-2">
              <div>{post.text}</div>

              <TagList tags={post.tags} />
              <div className="mb-3 flex flex-row justify-center gap-4 text-2xl">
                <span className="mx-2">{4}</span>
                <LikeButton />
                <span className="mx-2">{1}</span>
                <RepostButton />
                <span className="mx-2">{0}</span>
                <CommentButton setShowCommentForm={setShowCommentForm} />
              </div>
            </div>
          </div>
          {showCommentForm && (
            <PostCommentForm
              recipient={post.postOwner}
              commenter={
                user?.details || {
                  userName: "",
                  screenName: "",
                  followers: [],
                  following: [],
                }
              }
              setShowCommentForm={setShowCommentForm}
            />
          )}
        </div>
      </div>
    </dialog>
  );
}
