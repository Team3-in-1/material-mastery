import AccountNav from '@/components/Account/nav';
import { Group } from '@mantine/core';

interface IdPageInterface {
  [index: string]: number;
}
const ID_PAGE: IdPageInterface = {
  details: 0,
  orders: 1,
};

class Adapter {
  private namePage: string;
  constructor(namePage: string) {
    this.namePage = namePage;
  }
  getId(): number {
    return ID_PAGE[this.namePage];
  }
}

const AccountLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name_page: string };
}) => {
  const adapter = new Adapter(params.name_page);
  return (
    <Group className=' bg-[#f1f3f5] z-[1] h-full relative w-full'>
      <div className='flex-[1] h-full bg-white w-full  pt-[90px]'>
        <AccountNav idPage={adapter.getId()} />
      </div>
      <div className='flex-[6]'>{children}</div>
    </Group>
  );
};

export default AccountLayout;
