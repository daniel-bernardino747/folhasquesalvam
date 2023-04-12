export default function ErrorPage({ children }: { children: React.ReactNode }) {
  const defaultChildren = children || "Tivemos um erro inexperado";
  return (
    <div className="flex items-center justify-center pt-6 text-gray-700">
      {defaultChildren}
    </div>
  );
}
