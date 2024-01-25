import MaterialSymbolsGroupsRounded from "./Icons/MaterialSymbolsGroupsRounded";
import GroupThumbnail from "./Elements/SearchThumbnails/GroupThumbnail";

type SearchGroupProps = {
  results: Array<Group>;
  limit?: number | undefined;
};

export default function SearchGroups({ results, limit }: SearchGroupProps) {
  return (
    <div className="flex flex-col">
      <div className="mx-4 flex justify-start gap-2">
        <h1>
          <MaterialSymbolsGroupsRounded />
        </h1>
        <h3>Groups</h3>
      </div>
      {limit && results.length > limit
        ? results.slice(0, limit).map((group) => {
            return (
              <div
                key={
                  Math.floor(Math.random() * 1000) +
                  "" +
                  Math.floor(Math.random() * 1000)
                }
                className="my-2"
              >
                <GroupThumbnail group={group} />
              </div>
            );
          })
        : results.map((group) => {
            return (
              <div
                key={
                  Math.floor(Math.random() * 1000) +
                  "" +
                  Math.floor(Math.random() * 1000)
                }
                className="my-2"
              >
                <GroupThumbnail group={group} />
              </div>
            );
          })}

      {limit && results.length > limit && (
        <div className="mx-4 justify-self-end text-end">
          <p>
            <a>See more</a>
          </p>
        </div>
      )}
    </div>
  );
}
