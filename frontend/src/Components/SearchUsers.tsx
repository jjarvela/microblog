import UserThumbnail from "./Elements/UserThumbnail";
import MaterialSymbolsAccountCircle from "./Icons/MaterialSymbolsAccountCircle";

type SearchUserProps = {
  results: Array<User>;
  limit: number | undefined;
};

export default function SearchUsers({ results, limit }: SearchUserProps) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start gap-2">
        <h1>
          <MaterialSymbolsAccountCircle />
        </h1>
        <h3>Users</h3>
      </div>
      {limit
        ? results.slice(0, limit).map((user) => {
            return (
              <div
                key={
                  Math.floor(Math.random() * 1000) +
                  "" +
                  Math.floor(Math.random() * 1000)
                }
                className="my-2"
              >
                <UserThumbnail
                  profileName={user.screenName}
                  username={user.userName}
                  userDescription="this si test"
                  followers={5}
                  following={23}
                />
              </div>
            );
          })
        : results.map((user) => {
            return (
              <div
                key={
                  Math.floor(Math.random() * 1000) +
                  "" +
                  Math.floor(Math.random() * 1000)
                }
                className="my-2"
              >
                <UserThumbnail
                  profileName={user.screenName}
                  username={user.userName}
                  userDescription="this si test"
                  followers={5}
                  following={23}
                />
              </div>
            );
          })}

      {limit && (
        <div className="justify-self-end text-end">
          <p>
            <a>See more</a>
          </p>
        </div>
      )}
    </div>
  );
}
