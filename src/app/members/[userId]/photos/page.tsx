import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import PhotosPage from './PhotosPage';

type Props = {
  params: { userId: string };
};

const Page = async ({ params }: Props) => {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);

  return <PhotosPage photos={photos} />;
};

export default Page;
