import { useContext } from "react";
import MaterialSymbolsFavoriteRounded from "../../Icons/MaterialSymbolsFavoriteRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../../Icons/MaterialSymbolsFavoriteOutlineRounded";
import { socket } from "../../../globalData";
import postService from "../../../Services/postService";
import { PostContext } from "./Post";
import { useUser } from "../../../UserWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LikeButton({ liked }: { liked: boolean }) {
  const user = useUser().user;
  const post = useContext(PostContext);
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationKey: ["like-mutation", post.id],
    mutationFn: async () => {
      await postService.addReaction({
        type: "like",
        recipient_userid: post.original_poster_id,
        sender_userid: user!.id,
        read: false,
        blogpost_id: post.original_post_id || post.id,
      });

      if (post.reposter_id) {
        await postService.addReaction({
          type: "like of repost",
          recipient_userid: post.reposter_id,
          sender_userid: user!.id,
          read: false,
          blogpost_id: post.id,
        });
      }
    },
    onSuccess: () => {
      socket.emit("send-notification", post.original_poster_id);
      queryClient.invalidateQueries({
        queryKey: ["post-reaction-query", post.id],
      });
      if (post.reposter_id) {
        socket.emit("send-notification", post.reposter_id);
      }
      if (post.original_post_id) {
        queryClient.invalidateQueries({
          queryKey: ["post-reaction-query", post.original_post_id],
        });
      }
    },
  });

  const deleteLikeMutation = useMutation({
    mutationKey: ["like-delete", post.id],
    mutationFn: async () => {
      await postService.deleteReaction(
        post.original_post_id || post.id,
        user!.id,
        "like",
      );
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
      onClick={() => {
        if (!liked) {
          likeMutation.mutate();
        } else {
          deleteLikeMutation.mutate();
        }
      }}
    >
      {liked ? (
        <MaterialSymbolsFavoriteRounded className="text-[#fc4270]" />
      ) : (
        <MaterialSymbolsFavoriteOutlineRounded />
      )}
    </button>
  );
}
