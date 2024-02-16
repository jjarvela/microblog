export function NotificationDot({ count }: { count: number }) {
  return (
    <div className="absolute left-8 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
      {count}
    </div>
  );
}
