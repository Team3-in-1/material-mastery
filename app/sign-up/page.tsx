import NextImage from "next/image";
import Link from "next/link";
import {
  Flex,
  Image,
  Text,
  Title,
  Group,
  Stack,
  Anchor,
  Box,
} from "@mantine/core";
import displayImg from "@/public/pic/display-img.png";
import { SignUpForm } from "./signUpForm";
import { IconChevronLeft } from "@tabler/icons-react";

export default function page() {
  return (
    <Flex
      pt="7rem"
      pb="2.5rem"
      px="8.4vw"
      mih="100%"
      justify="space-between"
      pos="fixed"
      top="0"
      left="0"
      right="0"
      bg="#fff"
      className="overlay"
    >
      <Group
        className="hidden-desktop"
        align="center"
        gap="1rem"
        px="0.5rem"
        py="1rem"
        pos="fixed"
        top="0"
        right="0"
        left="0"
      >
        <Box p="0.5rem" display="flex">
          <IconChevronLeft size="1.5rem" />
        </Box>
        <Title order={4}>Đăng ký tài khoản</Title>
      </Group>
      <Image
        className="hidden-tablet"
        component={NextImage}
        src={displayImg}
        alt=""
        radius="3rem"
        w="45vw"
        h="33.3125rem"
      />
      <Stack className="form">
        <Title className="hidden-mobile" order={2}>
          Đăng ký tài khoản
        </Title>
        <SignUpForm />
        <Text size="sm" ta="center">
          Đã có tài khoản? <Link href="/sign-in">Đăng nhập ngay</Link>
        </Text>
      </Stack>
    </Flex>
  );
}
