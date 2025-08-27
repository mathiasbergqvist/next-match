'use client';

import CardLayout from '@/components/CardLayout';
import { Member } from '@/generated/prisma';

type Props = {
  member: Member;
};

const MemberPage = ({ member }: Props) => (
  <CardLayout header="Profile">{member.description}</CardLayout>
);

export default MemberPage;
