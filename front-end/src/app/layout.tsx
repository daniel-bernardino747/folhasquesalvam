import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: {
    default: "Folhas",
    template: "%s | Folhas Que Salvam",
  },
  description: "Te ensinamos a fazer muito pelo mundo com pouco do seu dia.",
  openGraph: {
    title: "Folhas que Salvam",
    description: "Te ensinamos a fazer muito pelo mundo com pouco do seu dia.",
    url: "https://folhasquesalvam.vercel.app/",
    siteName: "Folhas Que Salvam",
    locale: "pt-BR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      new URL("/favicon.ico", "https://folhasquesalvam.vercel.app"),
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={roboto.className}>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
