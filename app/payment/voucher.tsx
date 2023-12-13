'use client';
import Voucher from '@/components/Vouchers/voucher';
import voucherService from '@/services/voucherService';
import { Button, Divider, LoadingOverlay, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

const VoucherPayment = ({
  productId,
  setOpenedVoucher,
  voucherChosen,
  checkOut,
  orderValue,
}: {
  productId: string;
  setOpenedVoucher: any;
  voucherChosen: any;
  checkOut: any;
  orderValue: number;
}) => {
  // fake voucher
  const fakevouchers = [
    {
      image: 'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7',
      title: 'Giảm 20K',
      description: 'Cho đơn hàng tối thiểu 500k',
      expiry: '31/12/2023',
      detail: '',
      status: true,
    },
    {
      image: 'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7',
      title: 'Giảm 50K',
      description: 'Cho đơn hàng tối thiểu 2 triệu',
      expiry: '31/12/2023',
      detail: '',
      status: false,
    },

    {
      image: 'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7',
      title: 'Giảm 50k',
      description: 'Cho đơn hàng tối thiểu 500k',
      expiry: '31/12/2023',
      detail: '',
      status: true,
    },
  ];
  const vouchers: any = useQuery({
    queryKey: ['vouchers', productId],
    queryFn: () => voucherService.getVoucherOfProduct(productId),
  });

  const [checked, setChecked] = useState(voucherChosen[0]);

  return (
    <Stack align='center' justify='center'>
      {vouchers.data &&
        vouchers.data.map((voucher: any) => (
          <div key={voucher._id} className=' w-full h-full'>
            <Voucher
              image={
                'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7'
              }
              title={voucher.discount_name}
              description={voucher.discount_description}
              expiry={voucher.discount_end_date}
              detail={voucher.discount_value}
              status={orderValue >= voucher.discount_min_order_value}
              setChecked={setChecked}
              index={voucher._id}
              code={voucher.discount_code}
              isChecked={voucher._id === checked._id}
              discount_min_order_value={voucher.discount_min_order_value}
              type={voucher.discount_type}
              value={voucher.discount_value}
            />
            {/* <Divider my='sm' /> */}
          </div>
        ))}
      {vouchers.isPending && (
        <LoadingOverlay
          visible={true}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      )}
      <Button
        onClick={() => {
          setOpenedVoucher(false);
          if (checked._id === 'remove' && checked.code === 'remove') {
            voucherChosen[1]('');
            toast.success('Bỏ áp dụng voucher thành công.');
          } else {
            voucherChosen[1](checked);
            toast.success('Áp dụng voucher thành công.');
          }
          checkOut.mutate();
        }}
        className=' w-full bg-0-primary-color-6 '
      >
        Áp dụng
      </Button>
    </Stack>
  );
};

export default VoucherPayment;
