import { Spinner } from '@heroui/spinner';
import React from 'react';

const Loading = () => (
  <div className="flex justify-center items-center vertical-center">
    <Spinner label="Loading..." color="secondary" labelColor="secondary" />
  </div>
);

export default Loading;
