import { useState } from "react";
import TeamYellowRepostIconFill from "../../Icons/TeamYellowRepostIconFill";
import TeamYellowRepostIconLine from "../../Icons/TeamYellowRepostIconLine";

export default function RepostButton() {
  const [reposted, setReposted] = useState(false);
  return (
    <button onClick={() => setReposted(!reposted)}>
      {reposted ? (
        <TeamYellowRepostIconFill fill="#077a4a" />
      ) : (
        <TeamYellowRepostIconLine />
      )}
    </button>
  );
}
