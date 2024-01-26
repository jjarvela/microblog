import Hashtag from "./Elements/Hashtag";

export default function HashtagTrending() {
  const tempTrending = [
    "trending-tag1",
    "trending-tag2",
    "trending-tag3",
    "trending-tag4",
    "trending-tag5",
    "trending-tag6",
    "trending-tag7",
    "trending-tag8",
    "trending-tag9",
  ];
  return (
    <div className="mx-auto">
      <h4>Trending</h4>

      {tempTrending.map((tag, index) => {
        return (
          <div key={tag + index}>
            <h5>
              {index + 1}.{" "}
              <Hashtag tag={tag}>
                <span>#{tag}</span>
              </Hashtag>
            </h5>
            <p className="ml-8">
              {Math.floor(Math.random() * 1000) +
                " new posts in the past 1 day"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
