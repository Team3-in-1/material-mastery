import NextImage from 'next/image'
import { Container, Flex, Group, Image, Text } from "@mantine/core"
import logo from '@/public/icon.svg'
import Search from '../Search/search'
import LanguagePicker from '../LanguagePicker/languagePicker'
import { IconShoppingCart, IconUserCircle } from '@tabler/icons-react'
import classes from './header.module.css'

export default function Header() {
  const appName = 'Material Mastery'
  return (
    <Container fluid py='1rem' px='6rem' bg='white' pos='fixed' top='0' left='0' right='0' className={classes.zi1000}>
      <Flex justify='space-between' align='center'>
        <Flex align='center' gap='1rem'>
          <Image component={NextImage} src={logo} alt='Logo' w='2.5rem' h='2.5rem' fit='fill'></Image>
          <Text size='1rem' fw='900' c='turquoise.6' lh='1.1875rem'>{appName}</Text>
        </Flex>
        <Search content='' />
        <Flex gap='1rem' align='center'>
          <LanguagePicker />
          <IconShoppingCart className={classes.hoverIcon} />
          <IconUserCircle className={classes.hoverIcon} />
        </Flex>
      </Flex>
    </Container>
  )
}
