import Button from "./Elements/Button";

import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";
import SearchGroups from "./SearchGroups";
import SearchMedia from "./SearchMedia";
import SearchUsers from "./SearchUsers";

const Search = () => {
  const userResults: User[] = [
    { userName: "@testuser", screenName: "Test User ✨" },
    { userName: "@dickerson99", screenName: "Dickerson" },
    { userName: "@spamlord", screenName: "Spammer McSpamface" },
    { userName: "@madasitgets", screenName: "Outraged user 951 😤" },
    { userName: "@madasitgets", screenName: "Outraged user 951 😤" },
    { userName: "@madasitgets", screenName: "Outraged user 951 😤" },
  ];

  const groupResults: Array<{
    groupName: string;
    groupAdmin: string;
    groupDescription: string;
    groupMembers: number;
  }> = [
    {
      groupName: "CatLovers",
      groupAdmin: "@test",
      groupDescription: "This is a test",
      groupMembers: 84,
    },
    {
      groupName: "Dog luv",
      groupAdmin: "@test",
      groupDescription: "This is a test",
      groupMembers: 84,
    },

    {
      groupName: "Haters",
      groupAdmin: "@test",
      groupDescription: "This is a test",
      groupMembers: 84,
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
    <div className="mx-2 my-1 flex flex-col gap-4">
      <h2 className="mx-2">This is the main hub for search</h2>
      <div className="mx-auto my-2 text-center">
        <input id="search" type="text"></input>
        <label htmlFor="search" className="mx-2">
          <Button class="btn-primary text-lg">
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
