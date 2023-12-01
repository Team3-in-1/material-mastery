import { Group, Image, Stack, Text } from '@mantine/core';

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
}) => {
  console.log(isChecked);
  return (
    <Group
      className={
        isChecked
          ? ' h-[100px] w-full border-black border-2'
          : 'h-[100px] w-full '
      }
      onClick={() => {
        setChecked(index);
      }}
    >
      <Image h={'100%'} src={image} className='flex-[1] p-[10px]' />
      <Stack className='flex-[2]'>
        <Stack className=' gap-0'>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </Stack>
        <Group>
          <Text>{expiry}</Text>
          {!status && <Text>Chưa thỏa điều kiện</Text>}
        </Group>
      </Stack>
    </Group>
  );
};

export default Voucher;
