import { useRef, useState } from "react";
import MediaViewer from "./MediaViewer";

type PostMediaProps = {
  index: number;
  media: Media;
  class?: string;
  maxH?: string;
  maxW?: string;
};

export default function PostMedia({
  media,
  class: classAdd,
  maxH,
  maxW,
}: PostMediaProps) {
  const mediaViewer = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={
        "relative m-auto h-full w-full overflow-hidden bg-white75 dark:bg-[#000]" +
        " " +
        classAdd
      }
    >
      {media.type === "img" ? (
        <a
          className="cursor-pointer"
          onClick={() => {
            setIsOpen(true);
            mediaViewer.current?.showModal();
          }}
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
            <div className="absolute left-0 top-0 z-50 h-[75%] w-full"></div>
          </a>
          <video
            id={media.id}
            controls
            muted
            src={media.source}
            style={{
              height: "100%",
              width: "100%",
              maxHeight: maxH || "100%",
              maxWidth: maxW || "100%",
            }}
          />
        </>
      )}
      <MediaViewer
        active={media}
        refObject={mediaViewer}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
