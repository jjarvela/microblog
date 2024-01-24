import Post from "./Elements/PostElements/Post";
import MaterialSymbolsNewspaperSharp from "./Icons/MaterialSymbolsNewspaperSharp";

type SearchPostsProps = {
  results: Post[];
  limit?: number | undefined;
};

export default function SearchPosts({ results, limit }: SearchPostsProps) {
  return (
    <div className="flex flex-col">
      <div className="mx-4 flex justify-start gap-2">
        <h1>
          <MaterialSymbolsNewspaperSharp />
        </h1>
        <h3>Posts</h3>
      </div>
      {limit
        ? results.slice(0, limit).map((post) => {
            return (
              <div
                key={
                  Math.floor(Math.random() * 1000) +
                  "" +
                  Math.floor(Math.random() * 1000)
                }
                className="my-2"
              >
                <Post
                  postOwner={post.postOwner}
                  text={post.text}
                  media={post.media}
                  tags={post.tags}
                  reactions={post.reactions}
                  time={post.time}
                />
              </div>
            );
          })
        : results.map((post) => {
            return (
              <div
                key={
                  Math.floor(Math.random() * 1000) +
                  "" +
                  Math.floor(Math.random() * 1000)
                }
                className="my-2"
              >
                <Post
                  postOwner={post.postOwner}
                  text={post.text}
                  media={post.media}
                  tags={post.tags}
                  reactions={post.reactions}
                  time={post.time}
                />
              </div>
            );
          })}

      {limit && (
        <div className="mx-4 justify-self-end text-end">
          <p>
            <a>See more</a>
          </p>
        </div>
      )}
    </div>
  );
}
