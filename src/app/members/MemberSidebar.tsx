'use client';

import { Member } from '@/generated/prisma';
import { calculateAge } from '@/lib/util';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  member: Member;
};

const MemberSidebar = ({ member }: Props) => {
  const BASE_PATH = `/members/${member.userId}`;

  const navLinks = [
    { name: 'Profile', href: `${BASE_PATH}` },
    { name: 'Photos', href: `${BASE_PATH}/photos` },
    { name: 'Chat', href: `${BASE_PATH}/chat` },
  ];

  const pathName = usePathname();

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        height={200}
        width={200}
        src={member.image || '/images/user.png'}
        alt="user profile main image"
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody className="flex flex-col items-center">
        <div className="text-2xl">
          {member.name}, {calculateAge(member.dateOfBirth)}
        </div>
        <div className="text-sm text-neutral-500">
          {member.city}, {member.country}
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block rounded ${
                pathName === link.href
                  ? 'text-secondary'
                  : 'hover: text-secondary/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          color="secondary"
          variant="bordered"
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberSidebar;
