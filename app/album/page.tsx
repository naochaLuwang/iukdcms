import Link from "next/link";

import Empty from "@/app/components/Empty";
import Heading from "@/app/components/Heading";
import AlbulmCard from "@/app/components/albulm/AlbulmCard";
import client from "@/app/libs/prismadb";

const AlbumPage = async () => {
  const albums: any = await client.albulm.findMany({
    where: {
      status: "ACTIVE",
    },
  });

  if (albums.length === 0) {
    return (
      <Empty
        imgp="/albulm.svg"
        label="Oops! it looks like your album is empty."
        href="/album/create"
        title="Create New Album"
      />
    );
  }

  return (
    <div className="flex flex-col w-full max-h-screen px-10 py-10">
      <div className="flex items-center justify-between mb-6">
        <Heading title="Albums" />
        <Link href="/albulm/create">
          <div className="px-3 py-2 text-base text-white bg-blue-700 rounded-md w-fit ">
            Create new Album
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-4">
        {albums &&
          albums.map((album: any) => (
            <Link href={`/albulm/edit?id=${album.id}`} key={album.id}>
              <AlbulmCard
                image={album.thumbnailImage}
                title={album.title}
                count={album.images.length}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AlbumPage;
