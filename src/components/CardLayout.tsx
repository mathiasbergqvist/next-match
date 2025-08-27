'use client';

import { Card, CardHeader, Divider, CardBody } from '@heroui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  header: string;
};

const CardLayout = ({ children, header }: Props) => (
  <Card className="w-full mt-10 h-[80vh]">
    <CardHeader className="text-2xl font-semibold text-secondary">
      {header}
    </CardHeader>
    <Divider />
    <CardBody>{children}</CardBody>
  </Card>
);

export default CardLayout;
