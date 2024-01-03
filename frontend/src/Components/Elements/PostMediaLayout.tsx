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
        return <PostMedia type={items[0].type} source={items[0].source} />;
      case 2:
        return (
          <div className="flex h-[100%] flex-row gap-1">
            <div className="flex w-[50%] flex-col">
              <PostMedia type={items[0].type} source={items[0].source} />
            </div>
            <div className="flex w-[50%] flex-col">
              <PostMedia type={items[1].type} source={items[1].source} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex h-[100%] gap-1">
            <div className="flex w-[50%] flex-col">
              <PostMedia type={items[0].type} source={items[0].source} />
            </div>
            <div className="flex w-[50%] flex-col">
              <div className="mb-0.5 h-[50%]">
                <PostMedia type={items[1].type} source={items[1].source} />
              </div>
              <div className="mt-0.5 h-[50%]">
                <PostMedia type={items[2].type} source={items[2].source} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <>
            <div className="mb-1 flex h-[50%] flex-row gap-1">
              <div className=" flex w-[50%] flex-col">
                <PostMedia type={items[0].type} source={items[0].source} />
              </div>
              <div className="flex w-[50%] flex-col">
                <PostMedia type={items[1].type} source={items[1].source} />
              </div>
            </div>
            <div className="mt-1 flex h-[50%] flex-row gap-1">
              <div className="flex w-[50%] flex-col">
                <PostMedia type={items[2].type} source={items[2].source} />
              </div>
              <div className="flex w-[50%] flex-col">
                <PostMedia type={items[3].type} source={items[3].source} />
              </div>
            </div>
          </>
        );
      default:
        return <p>No media could be loaded</p>;
    }
  };

  return (
    <div className=" m-auto h-[25rem] w-[95%] overflow-hidden rounded-lg border-[1px] border-solid border-black25 dark:border-black75">
      {renderLayout(media)}
    </div>
  );
}
