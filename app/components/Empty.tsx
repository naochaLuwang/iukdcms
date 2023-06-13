import Image from "next/image";
import Link from "next/link";

interface EmptyProps {
  imgp: string;
  label: string;
  href: string;
  title: string;
}

const Empty: React.FC<EmptyProps> = ({ imgp, label, href, title }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-h-screen space-y-3">
      <div>
        <Image src={imgp} alt="" width={500} height={500} />
      </div>
      <h1 className="text-2xl">{label}</h1>
      <Link
        href={href}
        className="h-auto px-4 py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 active:bg-blue-900 w-fit"
      >
        {title}
      </Link>
    </div>
  );
};

export default Empty;
