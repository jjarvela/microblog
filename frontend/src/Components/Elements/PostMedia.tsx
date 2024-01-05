import { useRef } from "react";
import MediaViewer from "./MediaViewer";

type PostMediaProps = {
  index: number;
  media: Media;
};

export default function PostMedia({ index, media }: PostMediaProps) {
  const mediaViewer = useRef<HTMLDialogElement>(null);

  return (
    <div className="relative h-[100%] overflow-hidden bg-white75 dark:bg-[#000]">
      {media.type === "img" ? (
        <a
          className="cursor-pointer"
          onClick={() => mediaViewer.current?.showModal()}
        >
          <img
            id={media.id}
            src={media.source}
            style={{
              objectFit: "cover",
              height: "100%",
              width: "100%",
            }}
          />
        </a>
      ) : (
        <>
          <a
            className="cursor-pointer"
            onClick={() => mediaViewer.current?.showModal()}
          >
            <div className="absolute left-0 top-0 z-50 h-[60%] w-full"></div>
          </a>
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
        </>
      )}
      <MediaViewer
        index={index}
        active={{ id: media.id, type: media.type, source: media.source }}
        refObject={mediaViewer}
      />
    </div>
  );
}
