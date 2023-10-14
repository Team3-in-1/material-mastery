
import NextImage from 'next/image'
import { Flex, Image, Text, Title, Group, Stack, Anchor, Box } from "@mantine/core"
import displayImg from '@/public/pic/display-img.png'
import { SignInForm } from './signInForm'
import { IconChevronLeft } from '@tabler/icons-react'

export default function page() {

  return (
    <Flex pt='7rem' pb='2.5rem' px='8.4vw' mih='100%' justify='space-between' align='center' pos='fixed' top='0' left='0' right='0' bg='#fff' className="overlay">
      <Group align='center' gap='1rem' px='0.5rem' py='1rem' pos='fixed' top='0' right='0' left='0'>
        <Box p='0.5rem' display='flex'><IconChevronLeft size='1.5rem' /></Box>
        <Text>Đăng nhập</Text>
      </Group>
      <Stack className='form'>
        <Title className='hidden-mobile' order={2} >Đăng nhập</Title>
        <SignInForm />
        <Text size='sm' ta='center'>Chưa có tài khoản? <Anchor href=''>Đăng ký ngay</Anchor></Text>
      </Stack>
      <Image className='hidden-tablet' component={NextImage} src={displayImg} alt='' radius='3rem' w='45vw' h='33.3125rem' />
    </Flex>
  )
}
