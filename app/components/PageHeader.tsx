import Link from "next/link"; // assuming you're using react-router-dom for routing

type PageHeaderProps = {
  title: string;
  link: string;
  action: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, link, action }) => {
  return (
    <div className="flex flex-row items-center justify-between max-w-6xl px-5 py-5 mx-auto mt-10 bg-white border shadow-md">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-600">{title}</h1>
      </div>
      <div>
        <Link
          href={link}
          className="px-4 py-2 text-white bg-blue-800 rounded-md shadow-md"
        >
          {action}
        </Link>
      </div>
    </div>
  );
};

export default PageHeader;
