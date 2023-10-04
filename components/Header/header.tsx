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
    <Container fluid py='1rem' px='6rem' bg='white'>
      <Flex justify='space-between' align='center'>
        <Group>
          <Image component={NextImage} src={logo} alt='Logo' w='2.5rem' h='2.5rem' fit='fill'></Image>
          <Text size='lg' fw='700' c='turquoise.6'>{appName}</Text>
        </Group>
        <Search content=''/>
        <Group>
          <LanguagePicker />
          <IconShoppingCart className={classes.hoverIcon}/>
          <IconUserCircle className={classes.hoverIcon}/>
        </Group>
      </Flex>
    </Container>
  )
}
