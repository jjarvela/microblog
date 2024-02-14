import { useState } from "react";
import MaterialSymbolsFavoriteRounded from "../../Icons/MaterialSymbolsFavoriteRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../../Icons/MaterialSymbolsFavoriteOutlineRounded";
import { socket, testUserId } from "../../../globalData";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={() => {
        if (!liked) socket.emit("send-notification", testUserId);
        setLiked(!liked);
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
