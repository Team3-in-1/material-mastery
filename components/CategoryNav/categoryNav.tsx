"use client";
import React, { useState } from "react";
import { NavLink, Flex } from "@mantine/core";
import classes from "./categoryNav.module.css";
import { useRouter } from "next/navigation";

export const CategoryNav = ({ data, id }: any) => {
  const [active, setActive] = useState(id);
  const router = useRouter();

  const handleOnclick = (index: number): void => {
    setActive(index);
    router.push(`${data[index].label.toLowerCase()}`);
  };

  return (
    <Flex direction="column" className={`hidden-mobile ${classes.container}`}>
      {data.map((item: any, index: any) => (
        <NavLink
          key={item.label}
          active={index === active}
          label={item.label}
          onClick={() => handleOnclick(index)}
        />
      ))}
    </Flex>
  );
};
