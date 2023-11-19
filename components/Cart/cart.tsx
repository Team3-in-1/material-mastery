'use client'

import { Grid, Text, Checkbox, ActionIcon, Container, Group, Button } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import CartItem from "../CartItem/cartItem"

const Cart = () => {
    return (
        <Grid>
            <Grid.Col span={9}>
                <Grid columns={10} my={20} py={5} className='bg-white rounded-lg'>
                    <Grid.Col span={1} className='flex items-center justify-center'>
                        <Checkbox />
                    </Grid.Col>
                    <Grid.Col span={4} className='flex items-center'>
                        <Text className='text-[0.8rem]'>Sản phẩm</Text>
                    </Grid.Col>
                    <Grid.Col span={1} className='flex items-center'>
                        <Text className='text-[0.8rem]'>Đơn giá</Text>
                    </Grid.Col>
                    <Grid.Col span={2} className='flex items-center'>
                        <Text className='text-[0.8rem]'>Số lượng</Text>
                    </Grid.Col>
                    <Grid.Col span={1} className='flex items-center'>
                        <Text className='text-[0.8rem]'>Thành tiền</Text>
                    </Grid.Col>
                    <Grid.Col span={1} className='flex items-center'>
                        <ActionIcon variant="filled" aria-label="Delete">
                            <IconTrash color='#000' stroke={1.5} />
                        </ActionIcon>
                    </Grid.Col>
                </Grid>
                {
                    [1, 2].map(x => <CartItem/>)
                }
            </Grid.Col>
            <Grid.Col span={3}>
                <Container className='bg-white rounded' mt={20} py={20}>
                    <Group pb={20} justify='space-between' align='flex-start'>
                        <Text>Tạm tính</Text>
                        <div className='text-[#02B1AB] text-right'>
                            <p>
                                00.00
                                <span>đ</span>
                            </p>
                            <Text size="xs" c="dimmed">(Chưa bao gồm phí vận chuyển)</Text>
                        </div>
                    </Group>
                    <Button fullWidth className='bg-[#02B1AB]'>Mua hàng</Button>
                </Container>
            </Grid.Col>
        </Grid>
    )
}

export default Cart
