import ContentLoader from "react-content-loader";

export default function Loading() {
  return (
    <div className="h-screen">
      <div className="flex justify-between font-normal">
        <h1 className="text-4xl">
          <ContentLoader
            speed={2}
            width={400}
            height={66}
            viewBox="0 0 400 66"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect rx="5" ry="5" width="200" height="40" />
          </ContentLoader>
        </h1>
      </div>
      <ContentLoader
        speed={2}
        width={1001}
        height={348}
        viewBox="0 0 1001 348"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect y="64.5" rx="5" ry="5" width="1001" height="63" />
        <rect y="126" rx="5" ry="5" width="1001" height="63" />
      </ContentLoader>
    </div>
  );
}
