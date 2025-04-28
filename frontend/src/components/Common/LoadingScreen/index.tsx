import Spinner from "@components/Common/Spinner";

export default function LoadingScreen() {
  return (
    <div
      className="w-full flex items-center justify-center"
      style={{
        height: "calc(100vh - 64px)",
      }}
    >
      <div className="scale-180">
        <Spinner />
      </div>
    </div>
  );
}
