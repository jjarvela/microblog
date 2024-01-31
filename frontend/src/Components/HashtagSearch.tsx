import { Navigate, Route, Routes, useNavigate } from "react-router";
import Button from "./Elements/Button";
import TextInput from "./Elements/Inputs/TextInput";
import { MaterialSymbolsChevronLeftRounded } from "./Icons/MaterialSymbolsChevronLeftRounded";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";
import NotFound from "./NotFound";
import HashtagTrending from "./HashtagTrending";
import HashtagIndividual from "./HashtagIndividual";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function HashtagSearch() {
  const [searchTag, setSearchTag] = useState("");

  const trending = location.pathname === "/hashtag/trending";

  const navigate = useNavigate();

  return (
    <div className="my-1 flex flex-col gap-4">
      <div className="flex border-b-[1px] border-b-black50 py-2">
        <div className="self-center justify-self-start">
          {trending ? (
            <Link to={"/search"}>
              <MaterialSymbolsChevronLeftRounded className="text-xl" />
            </Link>
          ) : (
            <Link to={"/hashtag/trending"}>
              <MaterialSymbolsChevronLeftRounded className="text-xl" />
            </Link>
          )}
        </div>
        <div className="flex flex-grow justify-center gap-2">
          <TextInput
            placeholder="Search"
            value={searchTag}
            onChange={(e) => {
              const newSearchTag = e.target.value;
              setSearchTag(newSearchTag);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/hashtag/${searchTag}`);
              }
            }}
          />
          <Button
            class="btn-primary flex-shrink-0"
            onClick={() => navigate(`/hashtag/${searchTag}`)}
          >
            <MaterialSymbolsSearchRounded />
          </Button>
        </div>
      </div>
      <Routes>
        <Route index element={<Navigate to={"trending"} />}></Route>
        <Route path="trending" element={<HashtagTrending />}></Route>
        <Route path=":hashtag" element={<HashtagIndividual />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
