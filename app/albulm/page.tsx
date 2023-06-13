import { getAllAlbulms } from "../actions/getAllAlbulms";
import Empty from "../components/Empty";
import Heading from "../components/Heading";
import AlbulmCard from "../components/albulm/AlbulmCard";
import Link from "next/link";

const AlbumPage = async () => {
  const albums: AlbumProps[] = await getAllAlbulms();

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
          albums.map((album) => (
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
