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
    <div className="col short:overflow-hidden scrollbar-thin flex h-full w-full max-w-[16rem] flex-col overflow-scroll border-l border-black50 dark:to-black75">
      <h3 className="my-4 text-center text-secondary">Top Trends</h3>
      <ul className="ml-12 mr-6 list-decimal">
        {tempTags.map((val, i) => (
          <li key={i} className="border-b py-2 last:border-b-0">
            <Link className="link" to={""}>
              {val}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RightSidebar;
