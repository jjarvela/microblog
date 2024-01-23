import UsernameRepost from "./Elements/PostElements/UsernameRepost";
import PostContextMenu from "./Elements/PostElements/PostContextMenu";
import { useBreakpoint } from "../Hooks/BreakpointHook";
import UserProfileInfo from "./Elements/UserProfileInfo";
import PostModal from "./Elements/Modals/PostModal";
import { useContext, useRef, useState } from "react";
import { PostContext } from "./Elements/PostElements/Post";
import ReportPostModal from "./Elements/Modals/ReportPostModal";
import PostMediaLayout from "./Elements/PostElements/PostMediaLayout";
import InReplyTo from "./Elements/PostElements/InReplyTo";
import ConfirmModal from "./Elements/Modals/ConfirmModal";
import TagList from "./Elements/PostElements/TagList";
import LikeButton from "./Elements/PostElements/LikeButton";
import RepostButton from "./Elements/PostElements/RepostButton";
import ReportButton from "./Elements/PostElements/ReportButton";
import PostCommentForm from "./PostCommentForm";
import { UserContext } from "../UserWrapper";
import { ProfilePicture } from "./Elements/ProfilePicture";
import TextAreaInput from "./Elements/Inputs/TextAreaInput";
import { useLocation } from "react-router";

export default function PostPage() {
  const location = useLocation();
  const post: Post = location.state.post;

  const { isSm } = useBreakpoint("sm");
  const editModal = useRef<HTMLDialogElement>(null);
  const deleteConfirm = useRef<HTMLDialogElement>(null);
  const reportModal = useRef<HTMLDialogElement>(null);
  const user = useContext(UserContext);

  const ownerOptions = post.postOwner.userName === user.user?.userName;

  const [showCommentForm, setShowCommentForm] = useState(false);

  return (
    <PostContext.Provider
      value={{
        postOwner: post.postOwner,
        text: post.text,
        reactions: post.reactions,
        tags: post.tags,
        time: post.time,
        media: post.media,
        reposter: post.reposter,
        replyingTo: post.replyingTo,
      }}
    >
      <div className="relative my-2">
        <div className="timeline-box flex flex-col">
          {post.reposter && (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
              <UsernameRepost username={post.reposter} />
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
            <time className="mr-3 self-start underline">
              {post.time.toLocaleString()}
            </time>
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
              <ReportButton onClick={() => reportModal.current?.showModal()} />
            </div>
          </div>
          {showCommentForm ? (
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
          ) : (
            <div
              className="flex w-full gap-2"
              onClick={() => setShowCommentForm(true)}
            >
              <ProfilePicture width={50} image={user.user?.profileImage} />
              <div className="flex-grow">
                <TextAreaInput class="w-full" placeholder="Comment" />
              </div>
            </div>
          )}
        </div>
        {
          /*reactions.comments.length > 0 ? reactions.comments.map(comment => 
           { 
            return (
                <Post postOwner={comment.postOwner}
                    text={comment.text}
                    reactions={comment.reactions}
                    tags={comment.tags}
                    time={comment.time}
                    media={comment.media}
                    reposter={comment.reposter}
                    replyingTo={comment.replyingTo}
                />
            );
            }) : */
          <p className="my-2 text-center">This post has no comments yet</p>
        }
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
