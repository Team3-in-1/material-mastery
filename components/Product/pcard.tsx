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
import Link from "next/link";

export const PCard = () => {
  const [value, setValue] = useState(2);
  const name = "gạch lót sàn loại 1";
  return (
    <Card w={200} h={245} className={`${Styles.containerCard}`}>
      <Card.Section component={Link} href={`/details/${name}`}>
        <Image alt="product" src={url} component={NImage} height={145}></Image>
      </Card.Section>
      <Flex justify={"space-around"} direction={"column"} h={100} w={"100%"}>
        <Text style={{ marginTop: 5, fontSize: "1rem" }}>Nothing to show</Text>
        <Group justify="space-between">
          <Group gap={0} align="start" justify="flex-start">
            <Text size="20px">1000.00</Text>
            <Text size="12px">đ</Text>
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
};
