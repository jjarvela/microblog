import PostMedia from "./PostMedia";

type PostMediaProps = {
  media: Array<{ id: string; source: string; type: "img" | "vid" }>;
};

export default function PostMediaLayout({ media }: PostMediaProps) {
  const renderLayout = (
    items: Array<{ id: string; source: string; type: "img" | "vid" }>,
  ) => {
    switch (items.length) {
      case 1:
        return (
          <div className="m-auto">
            <PostMedia index={0} media={items[0]} maxH="35rem" maxW="100rem" />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row gap-1">
            <div className="flex w-[50%] flex-col">
              <PostMedia index={0} media={items[0]} maxH="15rem" />
            </div>
            <div className="flex w-[50%] flex-col">
              <PostMedia index={1} media={items[1]} maxH="15rem" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex gap-1">
            <div className="flex w-[50%] flex-col">
              <PostMedia index={0} media={items[0]} maxH="30rem" />
            </div>
            <div className="flex w-[50%] flex-col">
              <div className="mb-0.5 h-[50%]">
                <PostMedia index={1} media={items[1]} maxH="15rem" />
              </div>
              <div className="mt-0.5 h-[50%]">
                <PostMedia index={2} media={items[2]} maxH="15rem" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <>
            <div className="mb-1 flex h-[15rem] flex-row gap-1">
              <div className=" flex  w-[50%] flex-col">
                <PostMedia index={0} media={items[0]} maxH="15rem" />
              </div>
              <div className="flex w-[50%] flex-col">
                <PostMedia index={1} media={items[1]} maxH="15rem" />
              </div>
            </div>
            <div className="mt-1 flex h-[15rem] flex-row gap-1">
              <div className="flex w-[50%] flex-col">
                <PostMedia index={2} media={items[2]} maxH="15rem" />
              </div>
              <div className="flex w-[50%] flex-col">
                <PostMedia index={3} media={items[3]} maxH="15rem" />
              </div>
            </div>
          </>
        );
      default:
        return <p>No media could be loaded</p>;
    }
  };

  return (
    <div
      className={`mx-auto overflow-hidden rounded-lg border-[1px] border-solid border-black25 dark:border-black75 ${
        media.length > 1 ? "w-full" : "w-[max-content] max-w-[100%]"
      }`}
    >
      {renderLayout(media)}
    </div>
  );
}
