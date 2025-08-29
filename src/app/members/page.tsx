import { Member } from '@/generated/prisma';
import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';

const MembersPage = async () => {
  const members: Array<Member> | undefined | null = await getMembers();
  const likeIds: Array<string> | undefined = await fetchCurrentUserLikeIds();

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.length &&
        members.map((member) => (
          <MemberCard key={member.id} member={member} likeIds={likeIds || []} />
        ))}
    </div>
  );
};

export default MembersPage;
