// import SearchGroups from "./SearchGroups";
import SearchMedia from "./SearchMedia";
import SearchPosts from "./SearchPosts";
import SearchUsers from "./SearchUsers";

type SearchAllProps = {
  postResults: BlogPostFromServer[];
  userResults: User[];
  // groupResults: Group[];
  mediaResults: Media[];
};

export default function SearchAll({
  postResults,
  userResults,
  // groupResults,
  mediaResults,
}: SearchAllProps) {
  return (
    <>
      <SearchPosts results={postResults} />
      <SearchUsers results={userResults} limit={4} />
      {/* <SearchGroups results={groupResults} limit={4} /> */}
      <SearchMedia results={mediaResults} limit={15} />
    </>
  );
}
