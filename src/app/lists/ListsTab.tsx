'use client';

import { Member } from '@/generated/prisma';
import { LikedMembersType } from '@/lib/models';
import { Tab, Tabs } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key, useTransition } from 'react';
import MemberCard from '../members/MemberCard';
import LoadingComponent from '@/components/LoadingComponent';

type Props = {
  members: Array<Member>;
  likeIds: Array<string>;
};

type TabContentProps = Props & {
  loading: boolean;
};

type Tab = {
  id: string;
  label: string;
};

const TabContent = ({ loading, members, likeIds }: TabContentProps) => {
  if (loading) {
    return <LoadingComponent />;
  }

  if (members.length > 0) {
    return (
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} likeIds={likeIds} />
        ))}
      </div>
    );
  }

  return <div>No members for this filter</div>;
};

const ListsTab = ({ members, likeIds }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const tabs: Array<Tab> = [
    { id: LikedMembersType.SOURCE, label: 'Members I liked' },
    { id: LikedMembersType.TARGET, label: 'Members who liked me' },
    { id: LikedMembersType.MUTUAL, label: 'Mutual likes' },
  ];

  const handleTabChange = (key: Key) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('type', key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like Tabs"
        items={tabs}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <TabContent
              loading={isPending}
              members={members}
              likeIds={likeIds}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListsTab;
