import { Spinner } from '@heroui/react';
import React from 'react';

type Props = {
  label?: string;
};

const LoadingComponent = ({ label }: Props) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner
        label={label || 'Loading...'}
        color="secondary"
        labelColor="secondary"
      />
    </div>
  );
};

export default LoadingComponent;
