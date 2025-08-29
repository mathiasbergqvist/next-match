'use server';

import { prisma } from '@/lib/prisma';
import { getAuthUserId } from './authActions';
import { Member } from '@/generated/prisma';
import { LikedMembersType } from '@/lib/models';

export const toggleLikeMember = async (
  targetUserId: string,
  isLiked: boolean
) => {
  try {
    const userId = await getAuthUserId();

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.error('Error toggling like member:', error);
    throw error;
  }
};

export const fetchCurrentUserLikeIds = async (): Promise<Array<string>> => {
  try {
    const userId = await getAuthUserId();

    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.error('Error fetching like IDs:', error);
    throw error;
  }
};

export const fetchLikedMembers = async (
  type: LikedMembersType = LikedMembersType.SOURCE
): Promise<Array<Member>> => {
  try {
    const userId = await getAuthUserId();

    switch (type) {
      case LikedMembersType.SOURCE:
        return await fetchSourceLikes(userId);
      case LikedMembersType.TARGET:
        return await fetchTargetLikes(userId);
      case LikedMembersType.MUTUAL:
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.error('Error fetching liked members:', error);
    throw error;
  }
};

const fetchSourceLikes = async (userId: string) => {
  const sourceList = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetMember: true },
  });

  return sourceList.map((like) => like.targetMember);
};

const fetchTargetLikes = async (userId: string) => {
  const targetList = await prisma.like.findMany({
    where: { targetUserId: userId },
    select: { sourceMember: true },
  });

  return targetList.map((like) => like.sourceMember);
};

const fetchMutualLikes = async (userId: string) => {
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });

  const likedIds = likedUsers.map((like) => like.targetUserId);

  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });

  return mutualList.map((like) => like.sourceMember);
};
