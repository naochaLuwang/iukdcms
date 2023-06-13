import TriangleLoader from "./components/TriangleLoader";
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-h-screen space-y-2">
      <TriangleLoader />
      <h1 className="txt-neutral-400 animate-pulse">Loading...</h1>
    </div>
  );
}
