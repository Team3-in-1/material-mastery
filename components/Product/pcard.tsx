"use client";
import {
  Card,
  CardSection,
  Image,
  Group,
  Text,
  Flex,
  ActionIcon,
  Divider,
  Rating,
} from "@mantine/core";
import NImage from "next/image";
import url from "@/public/pic/gach.jpg";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { useState } from "react";
import Styles from "./pcard.module.css";

export default function Pcard() {
  const [value, setValue] = useState(2);
  return (
    <Card w={200} h={245} className={`${Styles.container}`}>
      <Card.Section>
        <Image alt="product" src={url} component={NImage} height={145}></Image>
      </Card.Section>
      <Flex justify={"space-around"} direction={"column"} h={100} w={"100%"}>
        <Text size="17px">Nothing to show</Text>
        <Group justify="space-between">
          <Group>
            <Text size="20px">00.00</Text>
            <Text>đ</Text>
          </Group>

          <ActionIcon color="#E9F9F8" variant="filled" aria-label="Add">
            <IconShoppingCartPlus color="#02B1AB"></IconShoppingCartPlus>
          </ActionIcon>
        </Group>
        <Group justify="space-between">
          <Rating value={value} onChange={setValue} />
          <Group>
            <Divider size="sm" orientation="vertical" />
            <Text c="dimmed">12k</Text>
          </Group>
        </Group>
      </Flex>
    </Card>
  );
}
