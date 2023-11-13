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
      <Card.Section component={Link} href={`/products/${name}`}>
        <Image
          alt="product"
          src={url}
          component={NImage}
          className="h-[147px]"
        ></Image>
      </Card.Section>
      <Flex
        justify={"space-around"}
        direction={"column"}
        h={100}
        w={"100%"}
        className="h-[100px] justify-around w-[100%] flex-col"
      >
        <Text className=" mt-2 font-mono">Nothing to show</Text>
        <Group justify="space-between" className=" justify-between">
          <Group
            gap={0}
            align="start"
            justify="flex-start"
            className=" items-start"
          >
            <Text size="20px" className=" text-[20px]">
              1000.00
            </Text>
            <Text size="12px" className=" text-[12px]">
              đ
            </Text>
          </Group>

          <ActionIcon color="#E9F9F8" variant="filled" aria-label="Add">
            <IconShoppingCartPlus color="#02B1AB"></IconShoppingCartPlus>
          </ActionIcon>
        </Group>
        <Group justify="space-between" className=" justify-between">
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
