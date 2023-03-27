import "../globals.css";
import Image from "next/image";
import Background from "../../../public/bg-panda.svg";

export const metadata = {
  title: "Folhas Que Salvam",
  description: "Mudando o mundo com uma atitude de cada vez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body className="h-green w-green flex justify-between bg-[#72AA63]">
        <section className="flex w-full justify-center">{children}</section>

        <Image
          src={Background}
          alt="background panda"
          className="h-screen w-auto"
        />
      </body>
    </>
  );
}
