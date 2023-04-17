import Image from "next/image";
import Logo from "../../../public/folhas-logo.png";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import clsx from "clsx";

type HeaderNavbarProps = {
  collapseSidebar: (collapsed?: boolean | undefined) => void;
  collapsed: boolean;
};

export const HeaderNavbar = ({
  collapseSidebar,
  collapsed,
}: HeaderNavbarProps) => (
  <div className="flex h-16 items-center justify-between border-b-[1px] border-[#DBDBDB] px-5 py-4">
    <div className="flex items-center hover:cursor-pointer">
      <Image
        onClick={() => collapseSidebar()}
        src={Logo}
        width={30}
        height={30}
        alt="main-logo-folhas"
      />
      <p
        className={clsx(
          "border-[#DBDBDB] pl-2 pt-1 text-lg font-bold text-[#0D062D]",
          { hidden: collapsed }
        )}
      >
        Folhas
      </p>
    </div>
    <AiOutlineDoubleLeft
      className={clsx("border-[#DBDBDB] hover:cursor-pointer", {
        hidden: collapsed,
      })}
      fill="#787486"
      onClick={() => collapseSidebar()}
    />
  </div>
);
