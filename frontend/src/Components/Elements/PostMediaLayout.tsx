import PostMedia from "./PostMedia";

type PostMediaProps = {
  media: Array<{ id: string; source: string; type: string }>;
};

export default function PostMediaLayout({ media }: PostMediaProps) {
  const renderLayout = (
    items: Array<{ id: string; source: string; type: string }>,
  ) => {
    switch (items.length) {
      case 1:
        return <PostMedia index={0} media={items[0]} />;
      case 2:
        return (
          <div className="flex h-[100%] flex-row gap-1">
            <div className="flex w-[50%] flex-col">
              <PostMedia index={0} media={items[0]} />
            </div>
            <div className="flex w-[50%] flex-col">
              <PostMedia index={1} media={items[1]} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex h-[100%] gap-1">
            <div className="flex w-[50%] flex-col">
              <PostMedia index={0} media={items[0]} />
            </div>
            <div className="flex w-[50%] flex-col">
              <div className="mb-0.5 h-[50%]">
                <PostMedia index={1} media={items[1]} />
              </div>
              <div className="mt-0.5 h-[50%]">
                <PostMedia index={2} media={items[2]} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <>
            <div className="mb-1 flex h-[50%] flex-row gap-1">
              <div className=" flex w-[50%] flex-col">
                <PostMedia index={0} media={items[0]} />
              </div>
              <div className="flex w-[50%] flex-col">
                <PostMedia index={1} media={items[1]} />
              </div>
            </div>
            <div className="mt-1 flex h-[50%] flex-row gap-1">
              <div className="flex w-[50%] flex-col">
                <PostMedia index={2} media={items[2]} />
              </div>
              <div className="flex w-[50%] flex-col">
                <PostMedia index={3} media={items[3]} />
              </div>
            </div>
          </>
        );
      default:
        return <p>No media could be loaded</p>;
    }
  };

  return (
    <div className=" m-auto h-[15rem] w-[95%] overflow-hidden rounded-lg border-[1px] border-solid border-black25 dark:border-black75 mid:h-[25rem]">
      {renderLayout(media)}
    </div>
  );
}
