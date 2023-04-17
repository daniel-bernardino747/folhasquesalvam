import { usePathname } from "next/navigation";
import * as pro from "react-pro-sidebar";
import clsx from "clsx";

import { HeaderNavbar } from "./HeaderNavbar";

import { AiOutlineSetting } from "react-icons/ai";
import { BsGrid, BsChatDots, BsUiChecksGrid } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import Link from "next/link";

const navItems = {
  "/dashboard": {
    name: "Dashboard",
    icon: <BsGrid />,
  },
  "/messages": {
    name: "Avisos",
    icon: <BsChatDots />,
  },
  // "/goals": {
  //   name: "Metas",
  //   icon: <BsUiChecksGrid />,
  // },
  "/members": {
    name: "Membros",
    icon: <HiOutlineUsers />,
  },
  // "/settings": {
  //   name: "Configuração",
  //   icon: <AiOutlineSetting />,
  // },
};

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

export function SideBar() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/members/")) {
    pathname = "/members";
  }
  const { collapseSidebar, collapsed } = pro.useProSidebar();

  return (
    <pro.Sidebar
      rootStyles={configStyleSideBar}
      collapsedWidth="70px"
      width="200px"
    >
      <HeaderNavbar collapseSidebar={collapseSidebar} collapsed={collapsed} />
      <pro.Menu>
        {Object.entries(navItems).map(([path, { name, icon }]) => {
          const isActive = path === pathname;
          return (
            <pro.MenuItem key={path} component={<Link href={path} />}>
              <div
                className={clsx("flex", {
                  "justify-center": collapsed,
                  "items-center": !collapsed,
                  "text-black": isActive,
                  "": !isActive,
                })}
              >
                {icon}
                <p
                  className={clsx({
                    hidden: collapsed,
                    "none pl-2": !collapsed,
                  })}
                >
                  {name}
                </p>
              </div>
            </pro.MenuItem>
          );
        })}
      </pro.Menu>
    </pro.Sidebar>
  );
}
