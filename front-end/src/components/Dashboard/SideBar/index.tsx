import Image from "next/image";
import Logo from "../../../../public/folhas-logo.png";
import * as pro from "react-pro-sidebar";
import { AiOutlineDoubleLeft, AiOutlineSetting } from "react-icons/ai";
import { BsGrid, BsChatDots, BsUiChecksGrid } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";

export function SideBar() {
  const { collapseSidebar, collapsed } = pro.useProSidebar();

  return (
    <pro.Sidebar
      rootStyles={configStyleSideBar}
      collapsedWidth="70px"
      width="200px"
    >
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
            className={
              collapsed
                ? "hidden"
                : "none border-[#DBDBDB] pl-2 pt-1 text-lg font-bold text-[#0D062D]"
            }
          >
            Folhas
          </p>
        </div>
        <AiOutlineDoubleLeft
          className={
            collapsed ? "hidden" : "none border-[#DBDBDB] hover:cursor-pointer"
          }
          fill="#787486"
          onClick={() => collapseSidebar()}
        />
      </div>
      <pro.Menu>
        <pro.MenuItem>
          <div
            className={collapsed ? "flex justify-center" : "flex items-center"}
          >
            <BsGrid />
            <p className={collapsed ? "hidden" : "none pl-2"}> Home </p>
          </div>
        </pro.MenuItem>
        <pro.MenuItem>
          <div
            className={collapsed ? "flex justify-center" : "flex items-center"}
          >
            <BsChatDots />
            <p className={collapsed ? "hidden" : "none pl-2"}> Avisos </p>
          </div>
        </pro.MenuItem>
        <pro.MenuItem>
          <div
            className={collapsed ? "flex justify-center" : "flex items-center"}
          >
            <BsUiChecksGrid />
            <p className={collapsed ? "hidden" : "none pl-2"}> Metas </p>
          </div>
        </pro.MenuItem>
        <pro.MenuItem>
          <div
            className={collapsed ? "flex justify-center" : "flex items-center"}
          >
            <HiOutlineUsers />
            <p className={collapsed ? "hidden" : "none pl-2"}> Membros </p>
          </div>
        </pro.MenuItem>
        <pro.MenuItem>
          <div
            className={collapsed ? "flex justify-center" : "flex items-center"}
          >
            <AiOutlineSetting />
            <p className={collapsed ? "hidden" : "none pl-2"}> Configuração </p>
          </div>
        </pro.MenuItem>
      </pro.Menu>
    </pro.Sidebar>
  );
}

const configStyleSideBar = {
  [`.${pro.sidebarClasses.container}`]: {
    backgroundColor: "white",
    borderRadius: "0.75rem 0 0 0.75rem",
    borderRight: "1px solid #DBDBDB",
    color: "#787486",
    height: "100%",
  },
  [`.${pro.menuClasses.root}`]: {
    paddingTop: "10px",
  },
  [`.${pro.menuClasses.menuItemRoot}`]: {
    backgroundColor: "white",
  },
  [`.${pro.menuClasses.button}`]: {
    "&:hover": {
      color: "black",
      backgroundColor: "white !important",
    },
  },
};
