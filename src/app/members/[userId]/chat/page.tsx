import { Card, CardHeader, Divider, CardBody } from '@heroui/react';
import React from 'react';

const ChatPage = () => {
  return (
    <Card className="w-full mt-10 h-[80vh]">
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>Chat go here</CardBody>
    </Card>
  );
};

export default ChatPage;
