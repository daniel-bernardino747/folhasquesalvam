import Image from "next/image";
import Link from "next/link";

import FolhasLogo from "../../../public/logo-folhas-white.svg";
import { HiMenu } from "react-icons/hi";

export function NavBar() {
  const optionClass = "px-2 py-4 lg:px-6 hover:scale-105 text-xl";
  const optionClassMobile =
    "py-4 px-6 w-full text-xl font-semibold hover:border-y-2 hover:border-white";

  return (
    <nav className="fixed top-0 left-0 w-full border-4 border-transparent border-b-white bg-[#305230] shadow-lg">
      <div className="container m-auto flex h-20 items-center justify-between text-white">
        <h1 className="py-4 pl-8 text-xl font-bold">
          <Link href="">
            <Image alt="Icon Folhas" src={FolhasLogo} width={50} height={50} />
          </Link>
        </h1>
        <ul className="hidden cursor-pointer items-center pr-10 text-base font-semibold md:flex">
          <li className={optionClass}>
            <Link href="/sobre">Sobre nós</Link>
          </li>
          <li className={optionClass}>
            <Link href="/proposta">Proposta</Link>
          </li>
          <li className={optionClass}>
            <Link href="/parceiros">Parceiros</Link>
          </li>
          <li className={optionClass}>
            <Link href="/login">Login</Link>
          </li>
          <li className="ml-4 flex h-10 w-40 items-center justify-center rounded-xl bg-amber-300 transition-all duration-100 hover:scale-105">
            <p className="text-xl text-[#305230]">
              <Link href="/seja-uma-folha">Seja uma folha</Link>
            </p>
          </li>
        </ul>
        <button className="none group mx-2 block rounded py-3 focus:outline md:hidden">
          <HiMenu className="hover:fill-amber-300" size="2em" />
          <div className="absolute top-0 -right-0 h-screen w-2/5 transform border-4 border-transparent border-l-white bg-[#305230] opacity-0 transition-all duration-300 group-focus:right-0 group-focus:opacity-100">
            <ul className="flex w-full cursor-pointer flex-col items-center pt-10">
              <li className={optionClassMobile}>
                <Link href="/">Home</Link>
              </li>
              <li className={optionClassMobile}>
                <Link href="/sobre">Sobre nós</Link>
              </li>
              <li className={optionClassMobile}>
                <Link href="/proposta">Proposta</Link>
              </li>
              <li className={optionClassMobile}>
                <Link href="/parceiros">Parceiros</Link>
              </li>
              <li className={optionClassMobile}>
                <Link href="/login">Login</Link>
              </li>
              <li className="absolute bottom-4 flex h-24 w-40 items-center justify-center rounded-xl bg-amber-300 px-4">
                <p className="text-xl font-bold text-[#305230]">
                  <Link href="/seja-uma-folha">Seja uma folha</Link>
                </p>
              </li>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  );
}
