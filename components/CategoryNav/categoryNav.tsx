"use client";
import React, { useState } from "react";
import { NavLink, Flex } from "@mantine/core";
import classes from "./categoryNav.module.css";
import { useRouter } from "next/navigation";

export const CategoryNav = ({ data, name }: any) => {
  const [active, setActive] = useState(name);
  const router = useRouter();

  const handleOnclick = (label: String): void => {
    setActive(label);
    router.push(`${label.toLowerCase()}`);
  };

  return (
    <Flex direction="column" className={`hidden-mobile ${classes.container}`}>
      {data.map((item: any, index: any) => (
        <NavLink
          key={item.label}
          active={item.label.toLowerCase() === active.toLowerCase()}
          label={item.label}
          onClick={() => handleOnclick(item.label)}
        />
      ))}
    </Flex>
  );
};
