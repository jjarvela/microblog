import UsernameRepost from "./Elements/PostElements/UsernameRepost";
import PostContextMenu from "./Elements/PostElements/PostContextMenu";
import { useBreakpoint } from "../Hooks/BreakpointHook";
import UserProfileInfo from "./Elements/UserProfileInfo";
import PostModal from "./Elements/Modals/PostModal";
import { useRef, useState } from "react";
import { PostContext } from "./Elements/PostElements/Post";
import ReportPostModal from "./Elements/Modals/ReportPostModal";
//import PostMediaLayout from "./Elements/PostElements/PostMediaLayout";
import InReplyTo from "./Elements/PostElements/InReplyTo";
import ConfirmModal from "./Elements/Modals/ConfirmModal";
import TagList from "./Elements/PostElements/TagList";
import ReportButton from "./Elements/PostElements/ReportButton";
import PostCommentForm from "./PostCommentForm";
import { useUser } from "../UserWrapper";
import { ProfilePicture } from "./Elements/ProfilePicture";
import TextAreaInput from "./Elements/Inputs/TextAreaInput";
import PostPageReactionHub from "./Elements/PostElements/PostPageReactionHub";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import postService from "../Services/postService";
import userService from "../Services/userService";

export default function PostPage() {
  const { isSm } = useBreakpoint("sm");
  const editModal = useRef<HTMLDialogElement>(null);
  const deleteConfirm = useRef<HTMLDialogElement>(null);
  const reportModal = useRef<HTMLDialogElement>(null);
  const user = useUser();
  const username = useParams().username || "default";
  const postId = useParams().postid || "1";

  const [showCommentForm, setShowCommentForm] = useState(false);

  const postInfoQuery = useQuery({
    queryKey: ["single-post-info", postId],
    queryFn: async () => {
      const user = await userService.getUserDetails(username);
      if (!user) throw new Error("No user by that name");
      return postService.getPosts((user as UserDetails).id!, parseInt(postId));
    },
  });

  const reactionQuery = useQuery({
    queryKey: ["post-reaction-query", parseInt(postId)],
    queryFn: async () => {
      //reposts fetch the original's reactions
      if (
        (postInfoQuery.data as BlogPostFromServer).reposter_id &&
        (postInfoQuery.data as BlogPostFromServer).original_post_id
      ) {
        const reactions = await postService.getReactions(
          (postInfoQuery.data as BlogPostFromServer).original_post_id!,
        );
        console.log(reactions);
        return reactions;
      } else {
        const reactions = await postService.getReactions(
          (postInfoQuery.data as BlogPostFromServer).id,
        );
        console.log(reactions);
        return reactions;
      }
    },
    enabled: postInfoQuery.isSuccess,
  });

  if (postInfoQuery.isLoading) {
    return (
      <h5 className="mx-auto my-8 w-max animate-pulse text-black50">Loading</h5>
    );
  }

  if (postInfoQuery.isError || !postInfoQuery.data) {
    return <h5 className="mx-auto my-8 w-max text-warning">Error</h5>;
  }

  function selectUser() {
    if ((postInfoQuery.data as BlogPostFromServer).reposter_idTousers) {
      if ((postInfoQuery.data as BlogPostFromServer).commenter_idTousers) {
        //repost of a comment
        return {
          id: (postInfoQuery.data as BlogPostFromServer).commenter_idTousers!
            .uid,
          userName: (postInfoQuery.data as BlogPostFromServer)
            .commenter_idTousers!.username!,
          screenName: (postInfoQuery.data as BlogPostFromServer)
            .commenter_idTousers!.screen_name!,
        };
        //repost of an original post
      } else {
        return {
          id: (postInfoQuery.data as BlogPostFromServer)
            .original_poster_idTousers.uid,
          userName: (postInfoQuery.data as BlogPostFromServer)
            .original_poster_idTousers.username!,
          screenName: (postInfoQuery.data as BlogPostFromServer)
            .original_poster_idTousers.screen_name!,
        };
      }
      //not a repost
    } else {
      return {
        id: (postInfoQuery.data as BlogPostFromServer).user_idTousers.uid,
        userName: (postInfoQuery.data as BlogPostFromServer).user_idTousers
          .username!,
        screenName: (postInfoQuery.data as BlogPostFromServer).user_idTousers
          .screen_name!,
      };
    }
  }

  return (
    <PostContext.Provider value={postInfoQuery.data}>
      <div className="relative my-2">
        <div className="timeline-box flex flex-col">
          {(postInfoQuery.data as BlogPostFromServer).reposter_idTousers && (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
              <UsernameRepost
                username={
                  (postInfoQuery.data as BlogPostFromServer).reposter_idTousers!
                    .username!
                }
              />
            </div>
          )}

          <div className="flex flex-row-reverse flex-wrap items-start gap-4">
            <PostContextMenu
              ownerOptions={
                (postInfoQuery.data as BlogPostFromServer)
                  .original_poster_id === user.user?.id
              }
              editPostCallback={() => editModal.current?.showModal()}
              deletePostCallback={() => deleteConfirm.current?.showModal()}
            />
            <h4>
              <ReportButton onClick={() => reportModal.current?.showModal()} />
            </h4>
            <UserProfileInfo class="self-center" user={selectUser()} />
          </div>
          {(postInfoQuery.data as BlogPostFromServer).commenter_id ? (
            <div>
              <InReplyTo
                username={
                  (postInfoQuery.data as BlogPostFromServer)
                    .original_poster_idTousers.username!
                }
              />
            </div>
          ) : null}

          <div className={`flex flex-col gap-3 ${isSm ? "m-6" : "m-3"}`}>
            <div>{(postInfoQuery.data as BlogPostFromServer).blog_text}</div>

            {/*post.media.length > 0 && <PostMediaLayout media={post.media} />*/}

            <TagList
              tags={(
                postInfoQuery.data as BlogPostFromServer
              ).item_properties.map((item) => item.value)}
            />

            <time className="mr-3">
              {new Date(
                (postInfoQuery.data as BlogPostFromServer).timestamp,
              ).toLocaleString()}
            </time>

            <PostPageReactionHub reactions={reactionQuery.data || []} />
          </div>
          {showCommentForm ? (
            <PostCommentForm
              recipient={selectUser()}
              commenter={
                user.details || {
                  userName: user.user?.userName || "",
                  screenName: user.user?.screenName || "",
                  followers: [],
                  following: [],
                }
              }
              setShowCommentForm={setShowCommentForm}
            />
          ) : (
            <div
              className="flex w-full gap-2"
              onClick={() => setShowCommentForm(true)}
            >
              {/* FIX ME! Replace with data from media endpoint */}
              <ProfilePicture width={50} image={""} />
              <div className="flex-grow">
                <TextAreaInput
                  className="w-full"
                  placeholder="Comment"
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                />
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
        text={(postInfoQuery.data as BlogPostFromServer).blog_text}
        tags={(postInfoQuery.data as BlogPostFromServer).item_properties.map(
          (item) => item.value,
        )}
        user={{
          userName: (postInfoQuery.data as BlogPostFromServer).user_idTousers
            .username!,
          screenName: (postInfoQuery.data as BlogPostFromServer).user_idTousers
            .screen_name!,
        }}
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
            {(postInfoQuery.data as BlogPostFromServer).blog_text}
          </p>
          <TagList
            tags={(
              postInfoQuery.data as BlogPostFromServer
            ).item_properties.map((item) => item.value)}
            class="italic"
          />
        </div>
      </ConfirmModal>

      <ReportPostModal refObject={reportModal} />
    </PostContext.Provider>
  );
}
