'use client';
import '@/styles/global.css';
import { IconCircleX } from '@tabler/icons-react';
import { Stepper, Text } from '@mantine/core';
import { useState } from 'react';
import {
  IconCreditCard,
  IconChecklist,
  IconTruckDelivery,
  IconPackage,
  IconStar,
} from '@tabler/icons-react';

const StepperOrder = ({ numberStep }: { numberStep: number }) => {
  const [active, setActive] = useState(numberStep);
  const color = active === 4 || active === 5 ? '#fa5252' : '#02B1AB';

  return (
    <>
      <Stepper
        active={active === 5 ? 2 : active === 4 ? 0 : active}
        color={color}
        className='w-full px-[50px] py-[30px]'
      >
        <Stepper.Step
          label='Xác nhận'
          icon={
            active === 4 ? (
              <IconCircleX
                color={color}
                style={{ width: '20 rem', height: '20 rem' }}
              />
            ) : (
              <IconChecklist
                color={color}
                style={{ width: '20 rem', height: '20 rem' }}
              />
            )
          }
        ></Stepper.Step>
        {/* <Stepper.Step
        label='Second step'
        description='Verify email'
        icon={<IconCreditCard color='#02B1AB' />}
      ></Stepper.Step> */}
        <Stepper.Step
          label='Vận chuyển'
          icon={<IconTruckDelivery color={color} />}
          orientation='vertical'
        ></Stepper.Step>
        <Stepper.Step
          label='Nhận hàng'
          icon={
            active === 5 ? (
              <IconCircleX
                color={color}
                style={{ width: '20 rem', height: '20 rem' }}
              />
            ) : (
              <IconPackage
                color={color}
                style={{ width: '20 rem', height: '20 rem' }}
              />
            )
          }
        ></Stepper.Step>
        <Stepper.Step
          label='Đánh giá'
          icon={<IconStar color={color} />}
        ></Stepper.Step>
      </Stepper>
      {(active === 4 || active === 5) && (
        <Text color='red' fw={700} size='30px'>{`Đơn hàng ${
          active === 4 ? 'đã bị hủy' : 'giao thất bại'
        }`}</Text>
      )}
    </>
  );
};
export default StepperOrder;
