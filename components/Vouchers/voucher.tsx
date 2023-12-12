import { Group, Image, Stack, Text } from '@mantine/core';
import toast from 'react-hot-toast';

const Voucher = ({
  image,
  title,
  description,
  expiry,
  detail,
  status,
  isChecked,
  setChecked,
  index,
  code,
}: {
  image: string;
  title: string;
  description: string;
  expiry: string;
  detail: string | null;
  status: boolean;
  isChecked: boolean;
  setChecked: Function;
  index: number;
  code: string;
}) => {
  console.log(isChecked);
  return (
    <Group
      className={
        isChecked && status
          ? ' h-[100px] w-full border-black border-[1px]'
          : 'h-[100px] w-full '
      }
      onClick={() => {
        if (status) {
          setChecked({ _id: index, code: code });
        } else {
          toast.error('Không đủ điều kiện để sử dụng Voucher này.');
        }
      }}
    >
      <div className='flex-[1] p-[10px] flex items-center justify-center'>
        <Image h={80} w='auto' src={image} />
      </div>
      <Stack className='flex-[2]'>
        <Stack className=' gap-0'>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </Stack>
        <Group>
          <Text>{expiry}</Text>
          {!status && (
            <Text className=' text-red-500 font-light'>
              Chưa thỏa điều kiện
            </Text>
          )}
        </Group>
      </Stack>
    </Group>
  );
};

export default Voucher;
