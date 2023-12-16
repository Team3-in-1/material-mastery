'use client';
import { productService } from '@/services/productService';
import { ActionIcon, Button, LoadingOverlay, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import '../../app/global.css';
import queryClient from '@/helpers/client';
type SearchText = {
  content: string;
};
export default function Search({ content }: SearchText) {
  const [keyWord, setKeyWord] = useState<string>('');
  const router = useRouter();

  const search = async (keyWord: string) => {
    let isSuccess = false;

    await queryClient.prefetchQuery({
      queryKey: ['search', keyWord],
      queryFn: async () => {
        await toast.promise(
          productService.search(keyWord).then((res) => {
            if (res.length != 0) {
              isSuccess = true;
              return res;
            } else {
              throw new Error();
            }
          }),
          {
            loading: 'Đang tìm...',
            success: <b>Đã tìm thấy.</b>,
            error: <b>Không tìm thấy sản phẩm.</b>,
          }
        );
        // await productService.search(keyWord).then((res) => {
        //   if (res.length != 0) {
        //     isSuccess = true;
        //   }
        //   return res;
        // });
      },
    });

    if (isSuccess) {
      router.push(`/find?key=${keyWord}`);
    }
  };
  return (
    <TextInput
      w='37.5rem'
      rightSection={
        <ActionIcon
          color='#8E8E8E'
          className=' cursor-pointer hover:bg-slate-100 rounded-full p-[2px] w-fit h-fit'
        >
          <IconSearch
            color='#8E8E8E'
            onClick={() => {
              search(keyWord);
            }}
            style={{ height: '1.5rem', width: '1.5rem' }}
          />
        </ActionIcon>
      }
      placeholder='Search...'
      radius='xl'
      size='sm'
      ml='md'
      value={keyWord}
      onChange={(event) => {
        setKeyWord(event.currentTarget.value);
      }}
    />
  );
}
