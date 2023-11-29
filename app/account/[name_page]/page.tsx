import Details from './details';
import OrdersPage from './orders';
import VouchersPage from './vouchers';

const AccountPage = ({ params }: { params: { name_page: string } }) => {
  if (params.name_page == 'details') return <Details />;
  if (params.name_page == 'orders') return <OrdersPage />;
  if (params.name_page == 'vouchers') return <VouchersPage />;
};

export default AccountPage;
