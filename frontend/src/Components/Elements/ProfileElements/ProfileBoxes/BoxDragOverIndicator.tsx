export type DragoverState = "onLeft" | "onRight" | null;

type BoxDragOverIndicatorProps = {
  over: DragoverState;
};

function BoxDragOverIndicator({ over }: BoxDragOverIndicatorProps) {
  switch (over) {
    case "onLeft":
      return (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 rounded-xl bg-red-500 opacity-25" />
      );
    case "onRight":
      return (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2 translate-x-full rounded-xl bg-green-500 opacity-25" />
      );
    default:
      break;
  }
}

export default BoxDragOverIndicator;
