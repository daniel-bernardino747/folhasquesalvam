import { SignedIn, UserButton } from "@clerk/nextjs/app-beta/client";

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b-[1px] border-[#DBDBDB] px-10">
      <div className="flex h-10 w-1/3 cursor-default items-center rounded-md bg-gray-100 px-4 text-gray-500">
        Em breve poderá pesquisar o que quiser...
      </div>
      <div className="flex w-1/4 items-center justify-between">
        <div className="flex gap-3">
          {/*  future features
            <div className="hidden h-6 w-6 rounded-full bg-gray-700"></div>
            <div className="hidden h-6 w-6 rounded-full bg-gray-700"></div>
            <div className="hidden h-6 w-6 rounded-full bg-gray-700"></div>
          */}
        </div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
