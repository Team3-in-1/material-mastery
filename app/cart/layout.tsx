import '../global.css';

import { Container } from '@mantine/core';

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='page-container'>
      <Container fluid py={70} px={100}>
        <div className='mt-4 px-2'>{children}</div>
      </Container>
    </div>
  );
};

export default CartLayout;
