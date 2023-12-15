'use client';
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox,
  LoadingOverlay,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import '../global.css';
import '@mantine/core/styles.css';

import {
  checkNameFormat,
  checkEmailFormat,
  checkPhoneFormat,
  checkPasswordFormat,
} from '@/utils/regex';
import { userService } from '@/services/userService';
import { useMutation } from '@tanstack/react-query';
import useLogin from '@/helpers/useLogin';
import { useRouter } from 'next/navigation';
import { IconInfoCircle } from '@tabler/icons-react';
import { useContext } from 'react';
import UserContext from '@/contexts/UserContext';

export function SignUpForm() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const form = useForm({
    // validateInputOnChange: true,
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      termsOfService: false,
    },
    validate: {
      name: (value) => checkNameFormat(value),
      phone: (value) => checkPhoneFormat(value),
      email: (value) => checkEmailFormat(value),
      password: (value) => checkPasswordFormat(value),
      termsOfService: (value) => (value ? null : 'Not accept term of service'),
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (formdata: FormData) => {
      return await userService.register(formdata);
    },
    onSuccess: (res) => {
      console.log('res', res);
      setUser(res);
      router.push('/');
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSubmit = async (formData: any) => {
    //await actionSignUp(formData);
    if (
      formData &&
      formData.name &&
      formData.phone &&
      formData.email &&
      formData.password
    ) {
      await registerMutation.mutateAsync(formData);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap='1rem'>
        <TextInput
          id='signup-form-name-input'
          name='name'
          label='Tên'
          placeholder='Nhập tên của bạn'
          withAsterisk
          {...form.getInputProps('name')}
          size='md'
        />
        <TextInput
          id='signup-form-phone-input'
          name='phone'
          label='Số điện thoại'
          placeholder='Nhập số điện thoại'
          withAsterisk
          {...form.getInputProps('phone')}
          size='md'
        />
        <TextInput
          id='signup-form-email-input'
          name='email'
          label='Email'
          placeholder='Nhập email'
          withAsterisk
          {...form.getInputProps('email')}
          size='md'
        />
        <PasswordInput
          id='signup-form-password-input'
          name='password'
          label='Mật khẩu'
          placeholder='Nhập mật khẩu'
          withAsterisk
          {...form.getInputProps('password')}
          size='md'
        />
        <Checkbox
          id='signup-form-term-cbx'
          mt='md'
          label='Tôi đồng ý với các chính sách và điều khoản'
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
      </Stack>
      <Button
        id='signup-form-btn'
        fullWidth
        h='3rem'
        mt='1.5rem'
        type='submit'
        className=' h-[3rem] mt-[1.5rem] w-full bg-0-primary-color-6 text-white'
      >
        Đăng ký
      </Button>
      {registerMutation.isPending && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      )}
      {registerMutation.isError && (
        <Alert
          variant='light'
          color='red'
          title='Error'
          icon={<IconInfoCircle />}
          withCloseButton
        >
          {registerMutation.failureReason?.message}
        </Alert>
      )}
    </form>
  );
}
