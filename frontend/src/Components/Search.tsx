import Button from "./Elements/Button";
import TextInput from "./Elements/Inputs/TextInput";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";
import SearchGroups from "./SearchGroups";
import SearchMedia from "./SearchMedia";
import SearchUsers from "./SearchUsers";

const Search = () => {
  const userResults: User[] = [
    {
      userName: "@testuser",
      screenName: "Test User ✨",
      followers: 5,
      following: 23,
    },
    {
      userName: "@dickerson99",
      screenName: "Dickerson",
      followers: 420,
      following: 666,
    },
    {
      userName: "@spamlord",
      screenName: "Spammer McSpamface",
      followers: 2,
      following: 10678,
    },
    {
      userName: "@madasitgets",
      screenName: "Outraged user 951 😤",
      followers: 487,
      following: 794,
    },
    {
      userName: "@madasitgets",
      screenName: "Outraged user 951 😤",
      followers: 487,
      following: 794,
    },
    {
      userName: "@madasitgets",
      screenName: "Outraged user 951 😤",
      followers: 487,
      following: 794,
    },
  ];

  const groupResults: Array<Group> = [
    {
      groupName: "CatLovers",
      groupAdmin: {
        userName: "@testuser",
        screenName: "Test User ✨",
        followers: 5,
        following: 23,
      },
      groupDescription: "This is a test",
      groupMembers: 84,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "everyone",
    },
    {
      groupName: "Dog luv",
      groupAdmin: {
        userName: "@dickerson99",
        screenName: "Dickerson",
        followers: 420,
        following: 666,
      },
      groupDescription: "This is a test",
      groupMembers: 84,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "everyone",
    },

    {
      groupName: "Haters",
      groupAdmin: {
        userName: "@madasitgets",
        screenName: "Outraged user 951 😤",
        followers: 487,
        following: 794,
      },
      groupDescription: "This is a test",
      groupMembers: 84,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "everyone",
    },
  ];

  const mediaResult: Media[] = [
    {
      id: "djgjkdfkjghj123",
      type: "img",
      source:
        "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg",
    },
    {
      id: "dsu123214o2",
      type: "vid",
      source: "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
    },
    {
      id: "djret4323234",
      type: "img",
      source:
        "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg",
    },
    {
      id: "djret4323234",
      type: "img",
      source:
        "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg",
    },
    {
      id: "124234rete",
      type: "img",
      source:
        "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg",
    },
    {
      id: "dsu43dsrw42",
      type: "vid",
      source: "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
    },
    {
      id: "dj4234dfgh",
      type: "img",
      source:
        "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg",
    },
  ];

  return (
    <div className="my-1 flex flex-col gap-4">
      <h2 className="my-4 text-center">Search Hub</h2>
      <div className="flex w-full flex-row justify-center gap-2">
        <TextInput id="search" class="max-h-min" />
        <label htmlFor="search">
          <Button class="btn-primary px-2 text-xl">
            <MaterialSymbolsSearchRounded />
          </Button>
        </label>
      </div>

      <SearchUsers results={userResults} limit={4} />
      <SearchGroups results={groupResults} limit={4} />
      <SearchMedia results={mediaResult} limit={15} />
    </div>
  );
};

export default Search;
