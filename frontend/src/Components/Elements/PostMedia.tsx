import { useRef } from "react";
import MediaViewer from "./MediaViewer";

type PostMediaProps = {
  media: Media;
};

export default function PostMedia({ media }: PostMediaProps) {
  const mediaViewer = useRef<HTMLDialogElement>(null);

  return (
    <div className="h-[100%] overflow-hidden bg-white75 dark:bg-[#000]">
      <a
        className="cursor-pointer"
        onClick={() => mediaViewer.current?.showModal()}
      >
        {media.type === "img" ? (
          <img
            id={media.id}
            src={media.source}
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
            }}
          />
        ) : (
          <video
            id={media.id}
            controls
            muted
            src={media.source}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              margin: "auto",
            }}
          />
        )}
      </a>
      <MediaViewer
        active={{ id: media.id, type: media.type, source: media.source }}
        refObject={mediaViewer}
      />
    </div>
  );
}
