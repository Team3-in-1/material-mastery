import { Text, Image } from "@mantine/core";
import { useEffect } from "react";
import classes from "./ccard.module.css";

export const CCard = ({ name, url }: any) => {
  console.log(name);
  return (
    <div className={`${classes.category_card_container}`}>
      <Image />
      <Text>{name}</Text>
    </div>
  );
};
