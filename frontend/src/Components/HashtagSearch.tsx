import { Navigate, Route, Routes } from "react-router";
import Button from "./Elements/Button";
import TextInput from "./Elements/Inputs/TextInput";
import { MaterialSymbolsChevronLeftRounded } from "./Icons/MaterialSymbolsChevronLeftRounded";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";
import NotFound from "./NotFound";
import HashtagTrending from "./HashtagTrending";
import HashtagIndividual from "./HashtagIndividual";
import { Link } from "react-router-dom";

export default function HashtagSearch() {
  return (
    <div className="my-1 flex flex-col gap-4">
      <div className="flex border-b-[1px] border-b-black50 py-2">
        <div className="self-center justify-self-start">
          <Link to={"/hashtag/trending"}>
            <MaterialSymbolsChevronLeftRounded className="text-xl" />
          </Link>
        </div>
        <div className="flex flex-grow justify-center gap-2">
          <TextInput placeholder="Search" />
          <Button class="btn-primary flex-shrink-0">
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
