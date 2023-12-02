import Details from './details';
import OrdersPage from './orders';
import VouchersPage from './vouchers';
import dynamic from 'next/dynamic';

const AccountPage = ({ params }: { params: { name_page: string } }) => {
  if (params.name_page == 'details') return <Details />;
  else if (params.name_page == 'orders') return <OrdersPage />;
  else if (params.name_page == 'vouchers') return <VouchersPage />;
};

export default AccountPage;
