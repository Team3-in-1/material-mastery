'use client';
import '@/styles/global.css';

import { Stepper } from '@mantine/core';
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

  return (
    <Stepper active={active} className='w-full px-[50px] py-[30px]'>
      <Stepper.Step
        label='Xác nhận'
        icon={<IconChecklist color='#02B1AB' />}
      ></Stepper.Step>
      {/* <Stepper.Step
        label='Second step'
        description='Verify email'
        icon={<IconCreditCard color='#02B1AB' />}
      ></Stepper.Step> */}
      <Stepper.Step
        label='Vận chuyển'
        icon={<IconTruckDelivery color='#02B1AB' />}
        orientation='vertical'
      ></Stepper.Step>
      <Stepper.Step
        label='Nhận hàng'
        icon={<IconPackage color='#02B1AB' />}
      ></Stepper.Step>
      <Stepper.Step
        label='Đánh giá'
        icon={<IconStar color='#02B1AB' />}
      ></Stepper.Step>
    </Stepper>
  );
};
export default StepperOrder;
