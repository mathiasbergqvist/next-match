import React from 'react';
import {
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from '../actions/likeActions';
import ListsTab from './ListsTab';
import { LikedMembersType } from '@/lib/models';

type Props = {
  searchParams: Promise<{ type: LikedMembersType }>;
};

const ListsPage = async ({ searchParams }: Props) => {
  const { type } = await searchParams;
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  );
};

export default ListsPage;
