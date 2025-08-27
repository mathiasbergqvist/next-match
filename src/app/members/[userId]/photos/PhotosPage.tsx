'use client';

import CardLayout from '@/components/CardLayout';
import { Photo } from '@/generated/prisma';
import { Image } from '@heroui/react';

type Props = {
  photos: Array<Photo> | null;
};

const PhotosPage = ({ photos }: Props) => (
  <CardLayout header="Photos">
    <div className="grid grid-cols-5 gap-3">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id}>
            <Image
              width={300}
              src={photo.url}
              alt="user photo"
              className="object-cover aspect-square"
            />
          </div>
        ))}
    </div>
  </CardLayout>
);

export default PhotosPage;
