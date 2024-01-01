import { Order } from '@/utils/response';
import {
  Button,
  Divider,
  Group,
  Modal,
  Stack,
  Stepper,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import OrderInformation from './orderInformation';
import DeliveryTimeline from '@/components/DeliveryTimeline/deliveryTimeline';
import { IconTruckDelivery } from '@tabler/icons-react';

enum statusOrder {
  'pending' = 0,
  'cancelled' = 1,
  'confirmed' = 1,
  'shipping' = 2,
  'shipped' = 3,
  'failed' = 3,
  'delivered' = 3,
}
export default function OrderStepper({
  data,
  mutate,
}: {
  data: Order;
  mutate: any;
}) {
  const [opened, handlers] = useDisclosure(false);
  const [failOpened, failedHandlers] = useDisclosure(false);

  const handleConfirmOrder = (id: string | undefined) => {
    const tmp = {
      orderId: id,
      status: 'confirmed',
    };
    mutate(tmp);
    handlers.close();
  };
  const handleConfirmDelivery = (id: string | undefined) => {
    const tmp = {
      orderId: id,
      status: 'shipping',
    };
    mutate(tmp);
    handlers.close();
  };
  const handleSuccessfulDelivery = (id: string | undefined) => {
    const tmp = {
      orderId: id,
      status: 'shipped',
    };
    mutate(tmp);
    handlers.close();
  };
  const handleFailedDelivery = (id: string | undefined) => {
    const tmp = {
      orderId: id,
      status: 'failed',
    };
    mutate(tmp);
    failedHandlers.close();
  };
  const stepper_cancelled = (
    <Stepper color='red' active={2} px='1rem' w='600'>
      <Stepper.Step
        label='Xác nhận'
        description='Xác nhận đơn hàng'
      ></Stepper.Step>
      <Stepper.Step
        label='Hủy đơn'
        description='Đơn hàng bị hủy bởi khách hàng'
      >
        <Group h='100px' justify='center' content='flex-end'>
          <Text size='1.6rem' c='red'>
            Đơn hàng bị hủy bởi khách hàng.
          </Text>
          <Text size='1rem' c='gray.6'>
            Lý do: Người mua không nhận hàng.
          </Text>
        </Group>
      </Stepper.Step>
    </Stepper>
  );
  if (data.order_status === 'cancelled') return stepper_cancelled;
  else
    return (
      <Stepper
        color={data?.order_status === 'failed' ? 'red' : 'turquoise'}
        active={statusOrder[data.order_status as keyof typeof statusOrder]}
        px='1rem'
        allowNextStepsSelect={false}
      >
        <Stepper.Step label='Xác nhận' description='Xác nhận đơn hàng'>
          <Stack gap='1rem' px='1rem' pt='1rem'>
            <OrderInformation data={data} />
            <Divider my='sm' />
            <Group gap='1rem' justify='center' pb='lg'>
              <Button variant='outline' size='md' color='red'>
                Hủy đơn
              </Button>
              <Button size='md' onClick={() => handlers.open()}>
                Xác nhận
              </Button>
            </Group>
            <Modal
              className='absolute z-[10000]'
              size='sm'
              opened={opened}
              onClose={() => handlers.close()}
              centered
              withCloseButton={false}
            >
              <Text w='100%' size='lg' fw='700' ta='center' my='lg'>
                Xác nhận đơn hàng
              </Text>
              <Group justify='center' mb='sm'>
                <Button
                  size='md'
                  variant='outline'
                  onClick={() => handlers.close()}
                >
                  Hủy
                </Button>
                <Button size='md' onClick={() => handleConfirmOrder(data?._id)}>
                  Xác nhận
                </Button>
              </Group>
            </Modal>
          </Stack>
        </Stepper.Step>
        <Stepper.Step
          label='Chuẩn bị hàng'
          description='Nhân viên chuẩn bị hàng'
        >
          <Stack gap='1rem' px='1rem' pt='1rem'>
            <OrderInformation data={data} />
            <Divider my='sm' />
            <Group gap='1rem' justify='center' pb='lg'>
              {/* <Button variant='outline' size='md' color='red'>Hủy đơn</Button> */}
              <Button size='md' onClick={() => handlers.open()}>
                Giao hàng
              </Button>
            </Group>
            <Modal
              className='absolute z-[10000]'
              size='sm'
              opened={opened}
              onClose={() => handlers.close()}
              centered
              withCloseButton={false}
            >
              <Text w='100%' size='lg' fw='700' ta='center' my='lg'>
                Xác nhận giao hàng
              </Text>
              <Group justify='center' mb='sm'>
                <Button
                  size='md'
                  variant='outline'
                  onClick={() => handlers.close()}
                >
                  Hủy
                </Button>
                <Button
                  size='md'
                  onClick={() => handleConfirmDelivery(data?._id)}
                >
                  Xác nhận
                </Button>
              </Group>
            </Modal>
          </Stack>
        </Stepper.Step>
        <Stepper.Step label='Giao hàng' description='Giao hàng cho người mua'>
          <Stack gap='1rem' px='1rem' pt='1rem'>
            <DeliveryTimeline
              onSuccess={() => handlers.open()}
              onFailed={() => failedHandlers.open()}
            />
            <Divider />
            <OrderInformation data={data} />
            <Modal
              className='absolute z-[10000]'
              size='sm'
              opened={opened}
              onClose={() => handlers.close()}
              centered
              withCloseButton={false}
            >
              <Text w='100%' size='lg' fw='700' ta='center' my='lg'>
                Xác nhận giao hàng thành công
              </Text>
              <Group justify='center' mb='sm'>
                <Button
                  size='md'
                  variant='outline'
                  onClick={() => handlers.close()}
                >
                  Hủy
                </Button>
                <Button
                  size='md'
                  onClick={() => handleSuccessfulDelivery(data?._id)}
                >
                  Xác nhận{' '}
                </Button>
              </Group>
            </Modal>
            <Modal
              className='absolute z-[10000]'
              size='sm'
              opened={failOpened}
              onClose={() => failedHandlers.close()}
              centered
              withCloseButton={false}
            >
              <Text w='100%' size='lg' fw='700' ta='center' my='lg'>
                Xác nhận giao hàng thất bại
              </Text>
              <Group justify='center' mb='sm'>
                <Button
                  size='md'
                  variant='outline'
                  onClick={() => failedHandlers.close()}
                >
                  Hủy
                </Button>
                <Button
                  size='md'
                  onClick={() => handleFailedDelivery(data?._id)}
                >
                  Xác nhận
                </Button>
              </Group>
            </Modal>
          </Stack>
        </Stepper.Step>
        {data?.order_status === 'shipped' ||
        data?.order_status === 'delivered' ? (
          <Stepper.Step
            label='Giao thành công'
            description='Giao hàng thành công'
          >
            <Group h='200px' justify='center'>
              <ThemeIcon variant='white' size='65px' color='green'>
                <IconTruckDelivery
                  size='65px'
                  color={data?.order_status === 'shipped' ? 'orange' : 'green'}
                />
              </ThemeIcon>
              <Text
                size='1.6rem'
                c={data?.order_status === 'shipped' ? 'yeallow' : 'green'}
              >
                {data?.order_status === 'shipped'
                  ? 'Đơn hàng đã được giao đến người mua'
                  : 'Khách hàng đã nhận được hàng'}
              </Text>
            </Group>
            <Divider my='lg' />
            <OrderInformation data={data} />
          </Stepper.Step>
        ) : (
          <Stepper.Step label='Giao thất bại' description='Giao hàng thất bại'>
            <Group h='100px' justify='center' content='flex-end'>
              <Text size='1.6rem' c='red'>
                Giao thất bại.
              </Text>
              <Text size='1rem' c='gray.6'>
                Lý do: Người mua không nhận hàng.
              </Text>
            </Group>
          </Stepper.Step>
        )}
      </Stepper>
    );
}
