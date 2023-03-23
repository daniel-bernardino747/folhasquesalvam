import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { NavBar } from "@/components";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
    <ClerkProvider>
      <html lang="en" className={roboto.className}>
        <body>
          <NavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
