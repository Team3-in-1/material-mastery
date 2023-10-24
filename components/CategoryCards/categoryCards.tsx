import { Flex } from "@mantine/core";
import { CCard } from "./ccard";

export const CategoryCards = ({ data }: any) => {
  const d = data;
  console.log(d);
  return (
    <div>
      {d.map((item: any) => (
        <CCard name={item.name}></CCard>
      ))}
    </div>
  );
};
