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
  post: Post;
  pinnedPost?: boolean;
  topInfo?: string; // This can be used instead of "reposter" for a customized message.
};

function Post({ post, pinnedPost, topInfo }: PostProps) {
  const { isSm } = useBreakpoint("sm");
  const editModal = useRef<HTMLDialogElement>(null);
  const deleteConfirm = useRef<HTMLDialogElement>(null);
  const reportModal = useRef<HTMLDialogElement>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const user = useUser();
  return (
    <PostContext.Provider value={post}>
      <div className="relative">
        <div className="timeline-box flex flex-col">
          {pinnedPost ? (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 p-2 px-6 pb-1 dark:border-white25">
              <PostPin />
            </div>
          ) : null}

          {post.reposter && (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
              <UsernameRepost username={post.reposter} />
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
              ownerOptions={user.user?.userName === post.postOwner.userName}
              editPostCallback={() => editModal.current?.showModal()}
              deletePostCallback={() => deleteConfirm.current?.showModal()}
            />
            {/*add proper postid to link here and in UserProfileInfo*/}
            <Link
              to={`/${post.postOwner.userName.substring(1)}/post/${1}`}
              state={post}
              className="mr-3 self-start underline underline-offset-2"
            >
              <time>{post.time.toLocaleString()}</time>
            </Link>
            <UserProfileInfo user={post.postOwner} />
          </div>

          {post.replyingTo ? (
            <div>
              <InReplyTo username={post.replyingTo} />
            </div>
          ) : null}

          <div className={`flex flex-col gap-3 ${isSm ? "m-6" : "m-3"}`}>
            <div>{post.text}</div>

            {post.media.length > 0 && <PostMediaLayout media={post.media} />}

            <TagList tags={post.tags} />
            <div className="mb-3 flex flex-row justify-center gap-4 text-2xl">
              <LikeButton />
              <RepostButton />
              <CommentButton setShowCommentForm={setShowCommentForm} />
              <ReportButton onClick={() => reportModal.current?.showModal()} />
            </div>
          </div>
          <Link
            to={`/${post.postOwner.userName.substring(1)}/post/${1}`}
            state={post}
          >
            <div className="-m-3 flex flex-row items-center justify-end gap-1 rounded-b-xl bg-black25 px-6 py-3 dark:bg-black75">
              <span className="text-lg">
                <PhFireSimpleBold />
              </span>
              <p>{post.reactions} Reactions</p>
            </div>
          </Link>
        </div>
        {showCommentForm && (
          <PostCommentForm
            recipient={post.postOwner}
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
        text={post.text}
        tags={post.tags}
        user={post.postOwner}
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
            {post.text}
          </p>
          <TagList tags={post.tags} class="italic" />
        </div>
      </ConfirmModal>

      <ReportPostModal refObject={reportModal} />
    </PostContext.Provider>
  );
}

export default Post;
