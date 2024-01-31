import PhFireSimpleBold from "../../Icons/PhFireSimpleBold";
import PostMediaLayout from "./PostMediaLayout";
import InReplyTo from "./InReplyTo";
import UsernameRepost from "./UsernameRepost";
import PostContextMenu from "./PostContextMenu";
import { createContext, useRef, useState } from "react";
import PostPin from "./PostPin";
import { useBreakpoint } from "../../../Hooks/BreakpointHook";
import UserProfileInfo from "../UserProfileInfo";
import PostModal from "../Modals/PostModal";
import ConfirmModal from "../Modals/ConfirmModal";
import TagList from "./TagList";
import LikeButton from "./LikeButton";
import RepostButton from "./RepostButton";
import CommentButton from "./CommentButton";
import ReportButton from "./ReportButton";
import PostCommentForm from "../../PostCommentForm";
import { useUser } from "../../../UserWrapper";
import ReportPostModal from "../Modals/ReportPostModal";
import { Link } from "react-router-dom";

export const PostContext = createContext<Post>({
  postOwner: { userName: "", screenName: "", followers: 0, following: 0 },
  text: "",
  reactions: 0,
  tags: [],
  time: new Date(),
  media: [],
  reposter: undefined,
  replyingTo: undefined,
});

type PostProps = {
  postOwner: User;
  reposter?: string | undefined;
  replyingTo?: string | undefined;
  text: string;
  media: Array<Media>;
  reactions: number;
  tags: string[];
  time: Date;
  ownerOptions?: boolean;
  pinnedPost?: boolean;
  topInfo?: string; // This can be used instead of "reposter" for a customized message.
};

function Post({
  postOwner,
  text,
  reactions,
  tags,
  time,
  media,
  reposter,
  replyingTo,
  ownerOptions,
  pinnedPost,
  topInfo,
}: PostProps) {
  const { isSm } = useBreakpoint("sm");
  const editModal = useRef<HTMLDialogElement>(null);
  const deleteConfirm = useRef<HTMLDialogElement>(null);
  const reportModal = useRef<HTMLDialogElement>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const user = useUser();
  return (
    <PostContext.Provider
      value={{
        postOwner,
        text,
        reactions,
        tags,
        time,
        media,
        reposter,
        replyingTo,
      }}
    >
      <div className="relative">
        <div className="timeline-box flex flex-col overflow-hidden">
          {pinnedPost ? (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 p-2 px-6 pb-1 dark:border-white25">
              <PostPin />
            </div>
          ) : null}

          {reposter && (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
              <UsernameRepost username={reposter} />
            </div>
          )}
          {topInfo && (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
              <p className="mb-2 text-black50">{topInfo}</p>
            </div>
          )}

          <div className="flex flex-row-reverse flex-wrap items-center gap-4">
            <PostContextMenu
              class="self-start"
              ownerOptions={ownerOptions}
              editPostCallback={() => editModal.current?.showModal()}
              deletePostCallback={() => deleteConfirm.current?.showModal()}
            />
            {/*add proper postid to link here and in UserProfileInfo*/}
            <Link
              to={`/${postOwner.userName.substring(1)}/post/${1}`}
              state={{
                post: {
                  postOwner,
                  text,
                  reactions,
                  tags,
                  time,
                  media,
                  reposter,
                  replyingTo,
                },
              }}
              className="mr-3 self-start underline"
            >
              <time>{time.toLocaleString()}</time>
            </Link>
            <UserProfileInfo user={postOwner} />
          </div>

          {replyingTo ? (
            <div>
              <InReplyTo username={replyingTo} />
            </div>
          ) : null}

          <div className={`flex flex-col gap-3 ${isSm ? "m-6" : "m-3"}`}>
            <div>{text}</div>

            {media.length > 0 && <PostMediaLayout media={media} />}

            <TagList tags={tags} />
            <div className="mb-3 flex flex-row justify-center gap-4 text-2xl">
              <LikeButton />
              <RepostButton />
              <CommentButton setShowCommentForm={setShowCommentForm} />
              <ReportButton onClick={() => reportModal.current?.showModal()} />
            </div>
          </div>
          <Link
            to={`/${postOwner.userName.substring(1)}/post/${1}`}
            state={{
              post: {
                postOwner,
                text,
                reactions,
                tags,
                time,
                media,
                reposter,
                replyingTo,
              },
            }}
          >
            <div className="-m-3 flex flex-row items-center justify-end gap-1 bg-black25 px-6 py-3 dark:bg-black75">
              <span className="text-lg">
                <PhFireSimpleBold />
              </span>
              <p>{reactions} Reactions</p>
            </div>
          </Link>
        </div>
        {showCommentForm && (
          <PostCommentForm
            recipient={postOwner}
            commenter={
              user?.user || {
                userName: "",
                screenName: "",
                followers: 0,
                following: 0,
              }
            }
            setShowCommentForm={setShowCommentForm}
          />
        )}
      </div>
      <PostModal
        text={text}
        tags={tags}
        user={postOwner}
        refObject={editModal}
        mode="edit"
      />
      <ConfirmModal
        message="Are you sure you want to delete this post?"
        cancelText="Cancel"
        confirmText="Delete"
        confirmCallback={() => console.log("Post delete triggered")}
        refObject={deleteConfirm}
      >
        <div className="flex flex-col gap-4">
          <p
            className="overflow-hidden italic opacity-75"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}
          >
            {text}
          </p>
          <TagList tags={tags} class="italic" />
        </div>
      </ConfirmModal>

      <ReportPostModal refObject={reportModal} />
    </PostContext.Provider>
  );
}

export default Post;
