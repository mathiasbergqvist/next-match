'use server';

import { auth } from '@/auth';
import { Member, Photo } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';

export const getMembers = async (): Promise<
  Array<Member> | undefined | null
> => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  try {
    return await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

export const getMemberByUserId = async (
  userId: string
): Promise<Member | null> => {
  try {
    return await prisma.member.findUnique({
      where: { userId },
    });
  } catch (error) {
    console.error('Error fetching member by userId:', error);
    throw error;
  }
};

export const getMemberPhotosByUserId = async (
  userId: string
): Promise<Array<Photo> | null> => {
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true }, // Select only the photos field, not the entire member
    });

    if (!member) {
      return null;
    }

    return member.photos;
  } catch (error) {
    console.error('Error fetching member photos by userId:', error);
    throw error;
  }
};
