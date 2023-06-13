"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubMenu = ({ data }: any) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        className={`link ${pathname?.includes(data.name) && "text-blue-600"}`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <IoIosArrowDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus.map((menu: any) => (
          <Link href={menu.href} key={menu.label}>
            <li
              className={`link  hover:bg-blue-100 hover:border-l-2 hover:border-blue-800 hover:bg-opacity-50 capitalize ${
                pathname == menu.href && "text-blue-800 w-full bg-blue-100"
              }`}
            >
              {menu.label}
            </li>
          </Link>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
