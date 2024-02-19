import PhFireSimpleBold from "../../Icons/PhFireSimpleBold";
//import PostMediaLayout from "./PostMediaLayout";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import postService from "../../../Services/postService";

export const PostContext = createContext<BlogPostFromServer>({
  id: 0,
  user_id: "",
  original_poster_id: "",
  user_idTousers: { uid: "" },
  original_poster_idTousers: { uid: "" },
  blog_text: "",
  item_properties: [],
  timestamp: new Date().toISOString(),
  original_created: new Date().toISOString(),
});

type PostProps = {
  post: BlogPostFromServer;
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
  const queryClient = useQueryClient();

  const reactionQuery = useQuery({
    queryKey: ["post-reaction-query", post.id],
    queryFn: async () => {
      //reposts fetch the original's reactions
      if (post.reposter_id && post.original_post_id) {
        const reactions = await postService.getReactions(post.original_post_id);
        console.log(reactions);
        return reactions;
      } else {
        const reactions = await postService.getReactions(post.id);
        console.log(reactions);
        return reactions;
      }
    },
  });

  const mutateDeletePost = useMutation({
    mutationFn: (ids: number[]) =>
      postService.deletePost(ids, user.user?.id || ""),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", user.user?.id] });
    },
  });

  const handlePostDelete = () => {
    if (post.id) mutateDeletePost.mutate([post.id]);
    else console.error("Missing post id for delete request!");
  };

  function selectUser() {
    if (post.reposter_idTousers) {
      if (post.commenter_idTousers) {
        //repost of a comment
        return {
          id: post.commenter_idTousers!.uid,
          userName: post.commenter_idTousers!.username!,
          screenName: post.commenter_idTousers!.screen_name!,
        };
        //repost of an original post
      } else {
        return {
          id: post.original_poster_idTousers.uid,
          userName: post.original_poster_idTousers.username!,
          screenName: post.original_poster_idTousers.screen_name!,
        };
      }
      //not a repost
    } else {
      return {
        id: post.user_idTousers.uid,
        userName: post.user_idTousers.username!,
        screenName: post.user_idTousers.screen_name!,
      };
    }
  }

  return (
    <PostContext.Provider value={post}>
      <div className="relative">
        <div className="timeline-box flex flex-col">
          {pinnedPost ? (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 p-2 px-6 pb-1 dark:border-white25">
              <PostPin />
            </div>
          ) : null}

          {post.reposter_idTousers && (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
              <UsernameRepost username={post.reposter_idTousers.username!} />
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
              ownerOptions={user.user?.id === post.original_poster_id}
              editPostCallback={() => editModal.current?.showModal()}
              deletePostCallback={() => deleteConfirm.current?.showModal()}
            />
            {/*add proper postid to link here and in UserProfileInfo*/}
            <Link
              to={`/${selectUser().userName!}/post/${
                post.original_post_id || post.id
              }`}
              state={post}
              className="mr-3 self-start underline underline-offset-2"
            >
              <time>{new Date(post.original_created).toLocaleString()}</time>
            </Link>
            <UserProfileInfo user={selectUser()} />
          </div>

          {post.commenter_idTousers ? (
            <div>
              <InReplyTo username={post.original_poster_idTousers.username!} />
            </div>
          ) : null}

          <div className={`flex flex-col gap-3 ${isSm ? "m-6" : "m-3"}`}>
            <div>{post.blog_text}</div>

            {/*post.media.length > 0 && <PostMediaLayout media={post.media} />*/}

            <TagList tags={post.item_properties.map((item) => item.value)} />
            <div className="mb-3 flex flex-row justify-center gap-4 text-2xl">
              <span>
                {reactionQuery.data
                  ? reactionQuery.data.filter(
                      (item: ReactionFromServer) => item.type === "like",
                    ).length
                  : 0}
              </span>
              <LikeButton
                liked={
                  (reactionQuery.data &&
                    reactionQuery.data
                      .filter(
                        (item: ReactionFromServer) => item.type === "like",
                      )
                      .map((item: ReactionFromServer) => item.sender_userid)
                      .indexOf(user.user?.id) > -1) ||
                  false
                }
              />
              <span>
                {reactionQuery.data
                  ? reactionQuery.data.filter(
                      (item: ReactionFromServer) => item.type === "repost",
                    ).length
                  : 0}
              </span>
              <RepostButton
                reposted={
                  (reactionQuery.data &&
                    reactionQuery.data
                      .filter(
                        (item: ReactionFromServer) => item.type === "repost",
                      )
                      .map((item: ReactionFromServer) => item.sender_userid)
                      .indexOf(user.user?.id) > -1) ||
                  false
                }
              />
              <span>{0}</span>
              <CommentButton setShowCommentForm={setShowCommentForm} />
              <ReportButton onClick={() => reportModal.current?.showModal()} />
            </div>
          </div>
          <Link
            to={`/${post.user_idTousers.username!}/post/${post.id}`}
            state={post}
          >
            <div className="-m-3 flex flex-row items-center justify-end gap-1 rounded-b-xl bg-black25 px-6 py-3 dark:bg-black75">
              <span className="text-lg">
                <PhFireSimpleBold />
              </span>
              <p>
                <span>
                  {reactionQuery.data ? reactionQuery.data.length : 0}{" "}
                </span>
                Reactions
              </p>
            </div>
          </Link>
        </div>
        {showCommentForm && (
          <PostCommentForm
            recipient={selectUser()}
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
      <PostModal
        id={post.id}
        text={post.blog_text}
        tags={post.item_properties.map((item) => item.value)}
        user={{
          id: post.user_idTousers.uid,
          userName: post.user_idTousers.username!,
          screenName: post.user_idTousers.screen_name!,
        }}
        refObject={editModal}
        mode="edit"
      />
      <ConfirmModal
        message="Are you sure you want to delete this post?"
        cancelText="Cancel"
        confirmText="Delete"
        confirmCallback={() => handlePostDelete()}
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
            {post.blog_text}
          </p>
          <TagList
            tags={post.item_properties.map((item) => item.value)}
            class="italic"
          />
        </div>
      </ConfirmModal>

      <ReportPostModal refObject={reportModal} />
    </PostContext.Provider>
  );
}

export default Post;
