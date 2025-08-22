import { auth } from '@/auth';
import React from 'react';
import TopNav from './TopNav';

const TopNavWrapper = async () => {
  const session = await auth();

  return <TopNav user={session?.user} />;
};

export default TopNavWrapper;
