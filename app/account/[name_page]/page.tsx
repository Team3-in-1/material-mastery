import Details from './details';
import OrdersPage from './orders';
import dynamic from 'next/dynamic';

const AccountPage = ({ params }: { params: { name_page: string } }) => {
  if (params.name_page == 'details') return <Details />;
  else if (params.name_page == 'orders') return <OrdersPage />;
};

export default AccountPage;
