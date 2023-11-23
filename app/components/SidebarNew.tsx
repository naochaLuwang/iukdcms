"use client";

import { useRef } from "react";
import SubMenu from "./SubMenu";

import { useSession } from "next-auth/react";

// * React icons

import { SlLogout, SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { MdPeople } from "react-icons/md";
import { IoImagesOutline } from "react-icons/io5";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  const { data: session } = useSession();

  const subMenusList = [
    {
      name: "Pages",
      icon: RiBuilding3Line,
      //   menus: ["auth", "app settings", "stroage", "hosting"],
      menus: [
        {
          label: "View Link",
          href: "/link",
        },

        {
          label: "View Sub Link",
          href: "/sublink",
        },
      ],
    },
    {
      name: "Marquee Notifications",
      icon: IoImagesOutline,

      menus: [
        {
          label: "Notifications",
          href: "/alerts",
        },
      ],
    },
    {
      name: "Counters",
      icon: RiBuilding3Line,
      //   menus: ["auth", "app settings", "stroage", "hosting"],
      menus: [
        {
          label: "View Counters",
          href: "/counter",
        },
      ],
    },
    {
      name: "Images",
      icon: IoImagesOutline,

      menus: [
        {
          label: "Carousal Images",
          href: "/carousalimage",
        },
        // {
        //   label: "Album",
        //   href: "/albulm",
        // },
      ],
    },
    {
      name: "Department",
      icon: TbReportAnalytics,

      menus: [
        {
          label: "View Department",
          href: "/department",
        },
      ],
    },

    {
      name: "Doctors",
      icon: MdPeople,

      menus: [
        {
          label: "View Doctors",
          href: "/people",
        },
      ],
    },

    {
      name: "Outreach OPD",
      icon: MdPeople,

      menus: [
        {
          label: "View OutreachOpds",
          href: "/outreachopd",
        },
      ],
    },

    {
      name: "Testimonial",
      icon: MdPeople,

      menus: [
        {
          label: "View Testimonial",
          href: "/testimonial",
        },
      ],
    },
    {
      name: "Terms & Privacy",
      icon: MdPeople,

      menus: [
        {
          label: "View Terms & Conditions",
          href: "/terms_conditions",
        },
        {
          label: "View Privacy Policies",
          href: "/privacy",
        },
      ],
    },
  ];

  if (!session) {
    return <></>;
  }
  return (
    <div>
      <div
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <Image src="/iukdlogon.png" alt="" height={40} width={40} />
          <span className="text-xl whitespace-pre">IUKD CMS</span>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-full h-full">
            <li>
              <Link
                href={"/dashboard"}
                className={`link  capitalize hover:bg-blue-100 hover:border-l-2 hover:border-blue-800 hover:bg-opacity-50 ${
                  pathname == "/dashboard" && "text-blue-800 w-full bg-blue-100"
                }`}
              >
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={"/users"}
                className={`link  capitalize hover:bg-blue-100 hover:border-l-2 hover:border-blue-800 hover:bg-opacity-50 ${
                  pathname == "/users" && "text-blue-800 w-full bg-blue-100"
                }`}
              >
                <BsPerson size={23} className="min-w-max" />
                Users
              </Link>
            </li>

            <div className="py-5 border-y border-slate-300 max-h-[32rem] overflow-y-auto">
              <small className="inline-block pl-3 mb-2 text-slate-500">
                Site
              </small>
              {subMenusList?.map((menu) => (
                <div key={menu.name} className="flex flex-col gap-1">
                  <SubMenu data={menu} />
                </div>
              ))}
            </div>

            <div className="py-5 ">
              <small className="inline-block pl-3 mb-2 text-slate-500">
                Site Settings
              </small>
              <Link
                href={"/orgsetting"}
                className={`link  capitalize hover:bg-blue-100 hover:border-l-2 hover:border-blue-800 hover:bg-opacity-50 ${
                  pathname == "/orgsetting" &&
                  "text-blue-800 w-full bg-blue-100"
                }`}
              >
                <SlSettings size={23} className="min-w-max" />
                Organization Setting
              </Link>
              <div
                onClick={() => signOut()}
                className={`link mt-2  capitalize   font-semibold bg-rose-500 text-white`}
              >
                <SlLogout size={23} className="min-w-max" />
                Sign Out
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
