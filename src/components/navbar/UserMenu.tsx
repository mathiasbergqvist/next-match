'use client';

import { signOutUser } from '@/app/actions/authActions';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/react';
import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';

type Props = {
  user: Session['user'];
};

const UserMenu = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform hover:scale-105"
          color="secondary"
          name={user?.name || user?.email || 'User'}
          size="sm"
          src={user?.image || '/images/user.png'}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            key="user-profile"
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed in as
            <span className="ml-2 font-semibold">
              {user?.name || user?.email}
            </span>
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key="edit-profile" as={Link} href="/members/edit">
          Edit Profile
        </DropdownItem>
        <DropdownItem
          key="sign-out"
          color="danger"
          onPress={async () => signOutUser()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
