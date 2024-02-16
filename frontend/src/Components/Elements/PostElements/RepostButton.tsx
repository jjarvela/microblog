import TeamYellowRepostIconFill from "../../Icons/TeamYellowRepostIconFill";
import TeamYellowRepostIconLine from "../../Icons/TeamYellowRepostIconLine";
import { socket } from "../../../globalData";
import postService from "../../../Services/postService";
import { PostContext } from "./Post";
import { useUser } from "../../../UserWrapper";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export default function RepostButton({ reposted }: { reposted: boolean }) {
  const user = useUser().user;
  const post = useContext(PostContext);
  const queryClient = useQueryClient();
  return (
    <button
      onClick={async () => {
        if (!reposted) {
          await postService.addReaction({
            type: "repost",
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
          await postService.deleteReaction(post.id!, user!.id, "repost");
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
