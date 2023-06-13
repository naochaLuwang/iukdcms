import { getAlbulm } from "@/app/actions/getAlbulm";
import EditAlbulm from "../../components/albulm/EditAlbulm";

interface SearchParams {
  id: string;
}

const EditAlbumPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const album: AlbumProps = await getAlbulm(searchParams.id);

  return (
    <>
      <EditAlbulm albulm={album} />
    </>
  );
};

export default EditAlbumPage;
