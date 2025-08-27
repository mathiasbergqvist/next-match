import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import React from 'react';
import MemberPage from './MemberPage';

const MemberDetailedPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) {
    return notFound();
  }

  return <MemberPage member={member} />;
};

export default MemberDetailedPage;
