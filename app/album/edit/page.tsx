import EditAlbulm from "@/app/components/albulm/EditAlbulm";
import client from "@/app/libs/prismadb";

interface SearchParams {
  id: string;
}

const EditAlbumPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const album: any = await client.albulm.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <>
      <EditAlbulm albulm={album} />
    </>
  );
};

export default EditAlbumPage;
