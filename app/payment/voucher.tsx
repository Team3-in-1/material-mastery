import Voucher from '@/components/Vouchers/voucher';
import voucherService from '@/services/voucherService';
import { Button, LoadingOverlay, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const VoucherPayment = ({
  productId,
  checkedVoucher,
  setCheckedVoucher,
  setOpenedVoucher,
  voucherChosen,
  checkOut,
}: {
  productId: string;
  checkedVoucher: any;
  setCheckedVoucher: any;
  setOpenedVoucher: any;
  voucherChosen: any;
  checkOut: any;
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

  return (
    <Stack align='center' justify='center'>
      {vouchers.data &&
        vouchers.data.map((voucher: any) => (
          <Voucher
            key={voucher._id}
            image={
              'https://i.scdn.co/image/ab671c3d0000f43092e9631e68790de3634409e7'
            }
            title={voucher.discount_name}
            description={voucher.discount_description}
            expiry={voucher.discount_end_date}
            detail={voucher.discount_value}
            status={voucher.discount_is_active}
            setChecked={setCheckedVoucher}
            index={voucher._id}
            code={voucher.discount_code}
            isChecked={voucher._id === checkedVoucher._id}
          />
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
          toast.success('Chọn voucher thành công.');
          voucherChosen[1](checkedVoucher);
          setOpenedVoucher(false);
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
