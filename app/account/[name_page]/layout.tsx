import '@/styles/global.css';
import AccountNav from '@/components/Account/nav';
import { Flex, Group, Stack } from '@mantine/core';

const AccountLayout = ({
  details,
  orders,
  params,
}: {
  details: React.ReactNode;
  orders: React.ReactNode;
  params: { name_page: string };
}) => {
  return (
    <Group
      bg={'#f1f3f5'}
      align='flex-start'
      h={'fit-content'}
      w={'100%'}
      className='z-[1] min-h-full relative'
    >
      <AccountNav namePage={params.name_page} />
      <Flex pt={100} h={'100%'} pb={30} direction={'column'} className='flex-1'>
        {params.name_page == 'details' ? details : orders}
      </Flex>
    </Group>
  );
};

export default AccountLayout;
