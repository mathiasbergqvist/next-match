import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import React from 'react';
import MemberSidebar from '../MemberSidebar';

type Props = {
  children: React.ReactNode;
  params: { userId: string };
};

const Layout = async ({ children, params }: Props) => {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default Layout;
