import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex items-center w-full h-10 bg-slate-500">
      <div className="flex items-center">
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default Footer;
