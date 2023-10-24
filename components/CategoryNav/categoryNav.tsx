"use client";
import React, { useState } from "react";
import { NavLink, Flex } from "@mantine/core";
import classes from "./categoryNav.module.css";

const data = [{ label: "Gạch" }, { label: "Nội thất" }];

export const CategoryNav = () => {
  const [active, setActive] = useState(-1);

  const handleOnclick = (index: number): void => {
    //do somthing here
    setActive(index);
  };

  return (
    <Flex direction="column" className={`hidden-mobile ${classes.container}`}>
      {data.map((item, index) => (
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
