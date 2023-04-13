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
        <div className="relative flex w-1/4 gap-10">
          <ContentLoader
            speed={2}
            width={240}
            height={66}
            viewBox="0 0 240 66"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="224" cy="16" r="16" />
            <circle cx="208" cy="16" r="16" />
            <circle cx="192" cy="16" r="16" />
            <circle cx="176" cy="16" r="16" />
            <circle cx="160" cy="16" r="16" />
          </ContentLoader>
        </div>
      </div>
      <ContentLoader
        speed={2}
        width={1001}
        height={348}
        viewBox="0 0 1001 348"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect rx="5" ry="5" width="323" height="348" />
        <rect x="339" rx="5" ry="5" width="323" height="348" />
        <rect x="678" rx="5" ry="5" width="323" height="348" />
      </ContentLoader>
    </div>
  );
}
