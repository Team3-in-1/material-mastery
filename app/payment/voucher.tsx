'use client'
import '@/styles/global.css'
import Voucher from '@/components/Vouchers/voucher'
import { Button, Divider, LoadingOverlay, Stack } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import VoucherService from '@/services/voucherService'
import UserContext from '@/contexts/UserContext'

const VoucherPayment = ({
  productId,
  setOpenedVoucher,
  voucherChosen,
  checkOut,
  orderValue,
}: {
  productId: string
  setOpenedVoucher: any
  voucherChosen: any
  checkOut: any
  orderValue: number
}) => {
  // fake voucher

  const { user } = useContext(UserContext)

  const vouchers: any = useQuery({
    queryKey: ['vouchers', productId],
    queryFn: async () => {
      const voucherService = new VoucherService(user)
      let temp = 0
      let maxVoucherNumber = 3
      return (await voucherService.getVoucherOfProduct(productId)).filter(
        (voucher: any) => {
          return (
            temp++ < maxVoucherNumber &&
            orderValue >= voucher.discount_min_order_value &&
            compareDate(voucher.discount_end_date)
          )
        },
      )
    },
    enabled: !!user,
  })

  const [checked, setChecked] = useState(voucherChosen[0])

  const compareDate = (
    time1: string,
    time2: string = new Date().toLocaleDateString('en-GB'),
  ) => {
    //2023-12-01T19:38:51.133Z
    const date1 = parseFloat(time1.split('T')[0].split('-')[2])
    const month1 = parseFloat(time1.split('T')[0].split('-')[1])
    const year1 = parseFloat(time1.split('T')[0].split('-')[0])

    //1/1/2024
    const date2 = parseFloat(time2.split('/')[0])
    const month2 = parseFloat(time2.split('/')[1])
    const year2 = parseFloat(time2.split('/')[2])

    if (year1 < year2) return false
    if (year1 > year2) return true
    if (month1 < month2) return false
    if (month1 > month2) return true
    if (date1 < date2) return false
    return true
  }

  // console.log(compareDate('2023-12-31T02:00:00.000Z'));
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
              status={
                orderValue >= voucher.discount_min_order_value &&
                compareDate(voucher.discount_end_date)
              }
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
          setOpenedVoucher(false)
          if (checked._id === 'remove' && checked.code === 'remove') {
            voucherChosen[1]('')
            toast.success('Bỏ áp dụng voucher thành công.')
          } else {
            voucherChosen[1](checked)
            toast.success('Áp dụng voucher thành công.')
          }
          checkOut.mutate()
        }}
        className=' w-full bg-0-primary-color-6 '
      >
        Áp dụng
      </Button>
    </Stack>
  )
}

export default VoucherPayment
