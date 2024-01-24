import { useState } from "react";
import MaterialSymbolsFavoriteRounded from "../../Icons/MaterialSymbolsFavoriteRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../../Icons/MaterialSymbolsFavoriteOutlineRounded";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? (
        <MaterialSymbolsFavoriteRounded className="text-[#fc4270]" />
      ) : (
        <MaterialSymbolsFavoriteOutlineRounded />
      )}
    </button>
  );
}
