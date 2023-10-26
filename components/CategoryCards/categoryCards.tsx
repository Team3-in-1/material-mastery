import { Flex } from "@mantine/core";
import { CCard } from "./ccard";
import gachImage from "@/public/pic/gach.jpg";

export const CategoryCards = ({ data }: any) => {
  const d = data;
  const url = gachImage;
  return (
    <div style={{ flexWrap: "wrap", display: "flex" }}>
      {d.map((item: any) => (
        <CCard name={item.name} url={url}></CCard>
      ))}
    </div>
  );
};
