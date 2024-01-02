type PostMediaProps = {
  media: Array<{ id: string; source: string; type: string }>;
};

export default function PostMediaLayout({ media }: PostMediaProps) {
  const renderLayout = (
    items: Array<{ id: string; source: string; type: string }>,
  ) => {
    switch (items.length) {
      case 1:
        return (
          <div>
            {items[0].type === "img" ? (
              <img src={items[0].source} />
            ) : (
              <video controls src={items[0].source} />
            )}
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row gap-1">
            <div>
              {items[0].type === "img" ? (
                <img src={items[0].source} />
              ) : (
                <video controls src={items[0].source} />
              )}
            </div>
            <div>
              {items[1].type === "img" ? (
                <img src={items[1].source} />
              ) : (
                <video controls src={items[1].source} />
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex h-[100%] gap-1">
            <div className="h-[100%] overflow-hidden bg-white75 dark:bg-[#000]">
              {items[0].type === "img" ? (
                <img
                  src={items[0].source}
                  className="min-h-[100%] min-w-[100%]"
                />
              ) : (
                <video
                  controls
                  src={items[0].source}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    margin: "auto",
                  }}
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-[50%] overflow-hidden bg-white75 dark:bg-[#000]">
                {items[1].type === "img" ? (
                  <img
                    src={items[1].source}
                    className="min-h-[100%] min-w-[100%]"
                  />
                ) : (
                  <video
                    controls
                    src={items[1].source}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      margin: "auto",
                    }}
                  />
                )}
              </div>
              <div className="h-[50%] overflow-hidden bg-white75 dark:bg-[#000]">
                {items[2].type === "img" ? (
                  <img
                    src={items[2].source}
                    className="min-h-[100%] min-w-[100%]"
                  />
                ) : (
                  <video
                    controls
                    src={items[2].source}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      margin: "auto",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div>
                {items[0].type === "img" ? (
                  <img src={items[0].source} />
                ) : (
                  <video controls src={items[0].source} />
                )}
              </div>
              <div>
                {items[1].type === "img" ? (
                  <img src={items[1].source} />
                ) : (
                  <video controls src={items[1].source} />
                )}
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <div>
                {items[2].type === "img" ? (
                  <img src={items[2].source} />
                ) : (
                  <video controls src={items[2].source} />
                )}
              </div>
              <div>
                {items[3].type === "img" ? (
                  <img src={items[3].source} />
                ) : (
                  <video controls src={items[3].source} />
                )}
              </div>
            </div>
          </div>
        );
      default:
        return <div>No media could be loaded</div>;
    }
  };

  return (
    <div className="m-auto h-[25rem] w-[95%] border-spacing-1 border-solid border-black25">
      {renderLayout(media)}
    </div>
  );
}
