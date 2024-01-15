import { MaterialSymbolsPhotoCameraRounded } from "./Icons/MaterialSymbolsPhotoCameraRounded";
import ImageThumb from "./Elements/ImageThumb";
import VideoThumb from "./Elements/VideoThumb";

type SearchMediaProps = {
  results: Array<Media>;
  limit: number | undefined;
};

export default function SearchMedia({ results, limit }: SearchMediaProps) {
  return (
    <div className="mx-4 flex flex-col">
      <div className="flex justify-start gap-2">
        <h1>
          <MaterialSymbolsPhotoCameraRounded />
        </h1>
        <h3>Media</h3>
      </div>
      <div className="flex flex-row flex-wrap">
        {limit
          ? results.slice(0, limit).map((media) => {
              return (
                <div
                  key={
                    Math.floor(Math.random() * 1000) +
                    "" +
                    Math.floor(Math.random() * 1000)
                  }
                >
                  {media.type === "img" ? (
                    <ImageThumb image={media} width={150} height={150} />
                  ) : (
                    <VideoThumb video={media} width={150} height={150} />
                  )}
                </div>
              );
            })
          : results.map((media) => {
              return (
                <div
                  key={
                    Math.floor(Math.random() * 1000) +
                    "" +
                    Math.floor(Math.random() * 1000)
                  }
                >
                  {media.type === "img" ? (
                    <ImageThumb image={media} width={150} height={150} />
                  ) : (
                    <VideoThumb video={media} width={150} height={150} />
                  )}
                </div>
              );
            })}
      </div>

      {limit && results.length > limit && (
        <div className="justify-self-end text-end">
          <p>
            <a>See more</a>
          </p>
        </div>
      )}
    </div>
  );
}
