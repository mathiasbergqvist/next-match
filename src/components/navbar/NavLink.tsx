"use client";

import { NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: Props) => {
  const pathName = usePathname();

  return (
    <NavbarItem isActive={pathName === href} as={Link} href={href}>
      {label}
    </NavbarItem>
  );
};

export default NavLink;
