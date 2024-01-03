type PostMediaProps = {
  type: string;
  source: string;
};

export default function PostMedia({ type, source }: PostMediaProps) {
  return (
    <div className="h-[100%] overflow-hidden bg-white75 dark:bg-[#000]">
      {type === "img" ? (
        <img
          src={source}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      ) : (
        <video
          controls
          src={source}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            margin: "auto",
          }}
        />
      )}
    </div>
  );
}
