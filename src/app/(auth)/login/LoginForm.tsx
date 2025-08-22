'use client';

import { signInUser } from '@/actions/authActions';
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema';
import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === 'success') {
      router.push('/members');
      // Refresh the page to reflect the new state. Showing the top meny user dropdown, e.i.
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              type="email"
              variant="bordered"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
              {...register('email')}
            />
            <Input
              defaultValue=""
              label="Password"
              type="password"
              variant="bordered"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
              {...register('password')}
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color="secondary"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
