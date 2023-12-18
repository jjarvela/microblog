import { Link } from "react-router-dom";

const tempTags = [
  "#trending-tag1",
  "#trending-tag2",
  "#trending-tag3",
  "#trending-tag4",
  "#trending-tag5",
  "#trending-tag6",
  "#trending-tag7",
  "#trending-tag8",
  "#trending-tag9",
];

function RightSidebar() {
  return (
    <div className="col flex h-full w-full max-w-[16rem] flex-col border-l border-black25">
      <h1 className="my-4 text-center font-heading text-2xl text-secondary">
        Top Trends
      </h1>
      <ul className="ml-12 mr-6 list-decimal">
        {tempTags.map((val, i) => (
          <li key={i} className="border-b py-2 last:border-b-0">
            <Link className="text-primary" to={""}>
              {val}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RightSidebar;
