import { Member } from '@/generated/prisma';
import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';

const MembersPage = async () => {
  const members: Array<Member> | undefined | null = await getMembers();

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.length &&
        members.map((member) => <MemberCard key={member.id} member={member} />)}
    </div>
  );
};

export default MembersPage;
