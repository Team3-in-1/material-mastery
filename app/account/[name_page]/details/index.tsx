'use client';

import {
  Stack,
  Group,
  Image,
  Button,
  TextInput,
  Text,
  Flex,
  LoadingOverlay,
} from '@mantine/core';
import '../../../global.css';
import NextImage from 'next/image';
import logo from '@/public/icon.svg';
import queryClient from '@/helpers/client';
import { useRouter } from 'next/navigation';
import { IconMapPinFilled } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { event } from 'cypress/types/jquery';
import { useMutation, useQuery } from '@tanstack/react-query';
import useLogin from '@/helpers/useLogin';
import toast, { Toaster } from 'react-hot-toast';
import {
  checkAddressFormat,
  checkEmailFormat,
  checkNameFormat,
  checkPhoneFormat,
} from '@/utils/regex';
import { userService } from '@/services/userService';
import dynamic from 'next/dynamic';
import { async } from 'rxjs';
import UserContext from '@/contexts/UserContext';

const DetailsPage = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user.user) {
    return <></>;
  }

  const [enableBox1, setEnableBox1] = useState(false);
  const [enableBox2, setEnableBox2] = useState(false);

  // store initial value
  let initialName =
    typeof window !== 'undefined' ? user?.user.display_name : '';
  let initialEmail = typeof window !== 'undefined' ? user?.user.email : '';
  let initialPhone = typeof window !== 'undefined' ? user?.user.phone : '';
  let initialAddress =
    typeof window !== 'undefined' ? user?.user.user_attributes.address : '';

  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [address, setAddress] = useState(initialAddress);

  const returnInitialValue = (type: number) => {
    if (type == 0) {
      setName(initialName);
      setPhone(initialPhone);
    } else setAddress(initialAddress);
  };

  const userId = typeof window !== 'undefined' ? user.user._id : '';

  const token = typeof window !== 'undefined' ? user.tokenPair.accessToken : '';

  const userMutation = useMutation({
    mutationKey: ['update-user'],
    mutationFn: () =>
      userService.updateUser(userId, token, name, phone, address),
    onSuccess: (res) => {
      toast.success('Cập nhập thành công');
      initialName = name || '';
      initialPhone = phone || '';
      initialAddress = address || '';
      const newUser = structuredClone(user);
      newUser.user = res;
      console.log('user', user);
      if (newUser) setUser(newUser);
    },
    onError: (err) => {
      toast.error('Cập nhập thất bại.');
      console.log('err: ', err);
    },
    retry: 3,
  });

  const updateClick = async () => {
    const a = await userMutation.mutateAsync();
  };

  return (
    <Stack className='w-full h-full px-[100px]'>
      <Group>
        <Stack align='center' justify='center' className='flex-[1]'>
          <Image
            alt='avater'
            h={100}
            w={100}
            component={NextImage}
            src={logo}
          />

          <Button>Thay đổi</Button>
        </Stack>
        <Stack className='flex-[2] bg-white rounded-[10px] p-[20px] box-content'>
          <Flex className=' w-full flex-row-reverse'>
            {enableBox1 && (
              <Button
                className=' h-5 text-[#02B1AB] bg-transparent border-0'
                //style={{ height: '1.25rem', color: '#02B1AB' }}
                onClick={() => {
                  returnInitialValue(0);
                  setEnableBox1(!enableBox1);
                }}
              >
                Hủy
              </Button>
            )}
            <Button
              className=' h-5 text-[#02B1AB] bg-transparent border-0'
              onClick={() => {
                if (enableBox1) {
                  // input valid check function will return null
                  if (checkNameFormat(name)) {
                    toast.error('Tên không hợp lệ');
                    returnInitialValue(0);
                  } else if (checkPhoneFormat(phone)) {
                    returnInitialValue(0);
                    toast.error('Số điện thoại không hợp lệ');
                  } else {
                    updateClick();
                  }
                }
                setEnableBox1(!enableBox1);
              }}
            >
              {enableBox1 ? 'Lưu' : 'Thay đổi'}
            </Button>
          </Flex>
          <TextInput
            withAsterisk
            label={'Tên'}
            value={name}
            disabled={!enableBox1}
            onChange={(event) => {
              setName(event.currentTarget.value);
            }}
          />
          <TextInput
            withAsterisk
            label={'Email'}
            value={initialEmail}
            disabled={true}
          />
          <TextInput
            withAsterisk
            label={'Số điện thoại'}
            value={phone}
            disabled={!enableBox1}
            onChange={(event) => {
              setPhone(event.currentTarget.value);
            }}
          />
        </Stack>
      </Group>
      <Stack className=' p-[20px] bg-white rounded-[10px]'>
        <Group className=' justify-between w-full'>
          <Group gap={1}>
            <IconMapPinFilled style={{ color: '#02B1AB' }} />
            <Text>Địa chỉ</Text>
          </Group>
          <Group gap={0}>
            <Button
              onClick={() => {
                if (enableBox2) {
                  // input valid check function will return null
                  if (checkAddressFormat(address)) {
                    toast.error('Địa chỉ không hợp lệ');
                    returnInitialValue(1);
                  } else {
                    updateClick();
                  }
                }
                setEnableBox2(!enableBox2);
              }}
              className=' h-5 cursor-pointer text-[#02B1AB] bg-transparent border-0'
            >
              {enableBox2 ? 'Lưu' : 'Thay đổi'}
            </Button>
            {enableBox2 && (
              <Button
                onClick={() => {
                  returnInitialValue(1);
                  setEnableBox2(!enableBox2);
                }}
                className=' h-5 text-[#02B1AB] bg-transparent border-0'
              >
                Hủy
              </Button>
            )}
          </Group>
        </Group>
        <TextInput
          withAsterisk
          disabled={!enableBox2}
          value={address}
          onChange={(event) => {
            setAddress(event.currentTarget.value);
          }}
        />
      </Stack>
      <Toaster position='bottom-center' />
    </Stack>
  );
};

export default dynamic(() => Promise.resolve(DetailsPage), { ssr: false });
