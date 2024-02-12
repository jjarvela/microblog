import { useState } from "react";
import TeamYellowRepostIconFill from "../../Icons/TeamYellowRepostIconFill";
import TeamYellowRepostIconLine from "../../Icons/TeamYellowRepostIconLine";
import { socket, testUserId } from "../../../globalData";

export default function RepostButton() {
  const [reposted, setReposted] = useState(false);
  return (
    <button
      onClick={() => {
        if (!reposted) socket.emit("send-notification", testUserId);
        setReposted(!reposted);
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
