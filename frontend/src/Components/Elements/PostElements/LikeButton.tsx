import { useContext } from "react";
import MaterialSymbolsFavoriteRounded from "../../Icons/MaterialSymbolsFavoriteRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../../Icons/MaterialSymbolsFavoriteOutlineRounded";
import { socket } from "../../../globalData";
import postService from "../../../Services/postService";
import { PostContext } from "./Post";
import { useUser } from "../../../UserWrapper";
import { useQueryClient } from "@tanstack/react-query";

export default function LikeButton({ liked }: { liked: boolean }) {
  const user = useUser().user;
  const post = useContext(PostContext);
  const queryClient = useQueryClient();
  return (
    <button
      onClick={async () => {
        if (!liked) {
          await postService.addReaction({
            type: "like",
            recipient_userid: post.postOwner.id!,
            sender_userid: user!.id,
            read: false,
            blogpost_id: post.id,
          });
          socket.emit("send-notification", post.postOwner.id!);
          queryClient.invalidateQueries({
            queryKey: ["post-reaction-query", post.id],
          });
        } else {
          await postService.deleteReaction(post.id, 2);
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
