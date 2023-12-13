import AccountNav from '@/components/Account/nav';
import { Flex, Group, Stack } from '@mantine/core';

const AccountLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name_page: string };
}) => {
  return (
    <Group className=' bg-[#f1f3f5] z-[1] min-h-full relative h-fit w-full items-start'>
      <AccountNav namePage={params.name_page} />
      <Flex className='flex-1 pt-[100px] h-full flex-col pb-[30px]'>
        {children}
      </Flex>
    </Group>
  );
};

export default AccountLayout;
