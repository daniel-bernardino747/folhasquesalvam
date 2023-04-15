export default function Loading() {
  return (
    <div className="flex h-screen w-screen animate-pulse items-center justify-center text-gray-500">
      <svg className="h-20 w-20 animate-spin" viewBox="0 0 80 80" />
    </div>
  );
}
