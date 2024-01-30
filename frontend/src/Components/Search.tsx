import { Link, useNavigate } from "react-router-dom";
import Button from "./Elements/Button";
import TextInput from "./Elements/Inputs/TextInput";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";

import { useEffect, useState } from "react";
import SearchAll from "./SearchAll";
import SearchUsers from "./SearchUsers";
import SearchGroups from "./SearchGroups";
import SearchMedia from "./SearchMedia";
import SearchPosts from "./SearchPosts";

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

  const [query, setQuery] = useState("");

  const [innerNav, setInnerNav] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, [query]);

  return (
    <div className="my-1 flex flex-col gap-4">
      <h2 className="my-4 text-center">Search Hub</h2>
      <div className="flex justify-center gap-2">
        <Link
          to={`/search${query !== "" ? "?q=" + query : ""}`}
          onClick={() => setInnerNav("")}
        >
          Top
        </Link>
        <Link
          to={`/search${query !== "" ? "?q=" + query + "&" : ""}?f=posts`}
          onClick={() => setInnerNav("posts")}
        >
          Posts
        </Link>
        <Link
          to={`/search${query !== "" ? "?q=" + query + "&" : ""}?f=people`}
          onClick={() => setInnerNav("people")}
        >
          People
        </Link>
        <Link
          to={`/search${query !== "" ? "?q=" + query + "&" : ""}?f=groups`}
          onClick={() => setInnerNav("groups")}
        >
          Groups
        </Link>
        <Link
          to={`/search${query !== "" ? "?q=" + query + "&" : ""}?f=media`}
          onClick={() => setInnerNav("media")}
        >
          Media
        </Link>
        <Link
          to={`/hashtag/${query !== "" ? query : ""}`}
          onClick={() => setInnerNav("media")}
        >
          Hashtags
        </Link>
      </div>
      <div className="flex w-full flex-row justify-center gap-2">
        <TextInput
          id="search"
          className="max-h-min"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(
                `/search${
                  query !== ""
                    ? "?q=" + query
                    : "" + innerNav !== ""
                      ? "?f=" + innerNav
                      : ""
                }`,
              );
            }
          }}
        />
        <label htmlFor="search">
          <Link
            to={`/search${query !== "" ? "?q=" + query : ""}${
              innerNav !== "" ? "&f=" + innerNav : ""
            }`}
          >
            <Button
              class="btn-primary px-2 text-xl"
              onClick={() =>
                navigate(
                  `/search${
                    query !== ""
                      ? "?q=" + query
                      : "" + innerNav !== ""
                        ? "?f=" + innerNav
                        : ""
                  }`,
                )
              }
            >
              <MaterialSymbolsSearchRounded />
            </Button>
          </Link>
        </label>
      </div>
      {innerNav === "" && (
        <SearchAll
          postResults={[]}
          userResults={userResults}
          groupResults={groupResults}
          mediaResults={mediaResult}
        />
      )}
      {innerNav === "posts" && <SearchPosts results={[]} />}
      {innerNav === "people" && <SearchUsers results={userResults} />}
      {innerNav === "groups" && <SearchGroups results={groupResults} />}
      {innerNav === "media" && <SearchMedia results={mediaResult} />}
    </div>
  );
};

export default Search;
