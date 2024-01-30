import { useRef } from "react";
import MaterialSymbolsCloseRounded from "../../Icons/MaterialSymbolsCloseRounded";

type ImageMessageBubbleProps = {
  media: Media;
  time: Date;
  sender: boolean;
};

export default function ImageMessageBubble({
  media,
  time,
  sender,
}: ImageMessageBubbleProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <div
      className={`relative flex w-fit max-w-[90%] flex-col ${
        sender ? "self-end" : "self-start"
      }`}
    >
      <div
        className={`h-40 w-40 cursor-pointer overflow-hidden rounded-xl border-[1px] border-black50 ${
          sender
            ? "justify-self-end  rounded-br-sm"
            : "justify-self-start rounded-bl-sm"
        }`}
        onClick={() => dialogRef.current?.showModal()}
      >
        {media.type === "img" && <img id={media.id} src={media.source} />}
        {media.type === "vid" && (
          <video id={media.id} src={media.source} muted />
        )}
      </div>
      <small
        className={`my-1 text-black50 ${sender ? "self-start" : "self-end"}`}
      >
        {time.toLocaleString()}
      </small>

      <dialog
        ref={dialogRef}
        className="relative h-screen rounded-xl border border-black50 bg-[#000] outline-none backdrop:bg-[#000] backdrop:opacity-50"
      >
        <div
          className="pointer-events-none absolute h-full w-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${media.source})` }}
        />
        {media.type === "img" && (
          <img
            id={media.id}
            src={media.source}
            className="relative left-0 top-0 z-10 h-full w-full object-contain backdrop-blur-2xl"
          />
        )}
        {media.type === "vid" && (
          <video
            id={media.id}
            src={media.source}
            controls
            muted
            className="h-full w-full object-contain"
          />
        )}
        <MaterialSymbolsCloseRounded
          onClick={() => dialogRef.current?.close()}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-lg border-2 border-transparent text-3xl text-black50 opacity-50 drop-shadow transition-all duration-100 hover:border-black50 hover:opacity-100"
        />
      </dialog>
    </div>
  );
}
