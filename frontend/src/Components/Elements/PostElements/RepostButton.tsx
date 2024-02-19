import TeamYellowRepostIconFill from "../../Icons/TeamYellowRepostIconFill";
import TeamYellowRepostIconLine from "../../Icons/TeamYellowRepostIconLine";
import { socket } from "../../../globalData";
import postService from "../../../Services/postService";
import { PostContext } from "./Post";
import { useUser } from "../../../UserWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export default function RepostButton({ reposted }: { reposted: boolean }) {
  const user = useUser().user;
  const post = useContext(PostContext);
  const queryClient = useQueryClient();

  const repostMutation = useMutation({
    mutationKey: ["repost-mutation", post.id],
    mutationFn: async () => {
      await postService.addReaction({
        type: "repost",
        recipient_userid: post.original_poster_idTousers.uid,
        sender_userid: user!.id,
        read: false,
        blogpost_id: post.original_post_id || post.id,
      });

      if (post.reposter_id) {
        await postService.addReaction({
          type: "repost of repost",
          recipient_userid: post.reposter_id,
          sender_userid: user!.id,
          read: false,
          blogpost_id: post.id,
        });
      }
    },
    onSuccess: () => {
      socket.emit("send-notification", post.original_poster_idTousers.uid);
      socket.emit("send-notification", post.reposter_id);
      queryClient.invalidateQueries({
        queryKey: ["post-reaction-query", post.id],
      });
      if (post.original_post_id) {
        queryClient.invalidateQueries({
          queryKey: ["post-reaction-query", post.original_post_id],
        });
      }
    },
  });

  const deleteRepostMutation = useMutation({
    mutationKey: ["repost-delete", post.id],
    mutationFn: async () => {
      /*await postService.deleteReaction(
        post.original_post_id || post.id,
        user!.id,
        "repost",
      );
      await postService.deletePost([post.id], user!.id);*/
      console.log(post);
      console.log(post.id);
      console.log(post.original_post_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-reaction-query", post.id],
      });
      if (post.original_post_id) {
        queryClient.invalidateQueries({
          queryKey: ["post-reaction-query", post.original_post_id],
        });
      }
    },
  });

  return (
    <button
      onClick={async () => {
        if (!reposted) {
          repostMutation.mutate();
        } else {
          deleteRepostMutation.mutate();
        }
      }}
    >
      {reposted ? (
        <TeamYellowRepostIconFill className="text-[#13d664]" />
      ) : (
        <TeamYellowRepostIconLine />
      )}
    </button>
  );
}
