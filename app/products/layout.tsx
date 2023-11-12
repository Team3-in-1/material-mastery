import { Flex, ScrollArea } from "@mantine/core";
import { CategoryNav } from "@/components/CategoryNav/categoryNav";
import { FC } from "react";

import "../global.css";

const data = [{ label: "Gach men" }, { label: "Gach lot tuong" }];

export default function ProductsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: String };
}) {
  return (
    <div className={`page-container`}>
      <div
        style={{
          paddingTop: "120px",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          className="hidden-mobile"
          style={{
            flex: "2",
            display: "flex",
            alignItems: "flex-end",
            paddingLeft: "100px",
            paddingBottom: "10px",
          }}
        >
          <div>Trang chủ</div>
        </div>
        <div
          style={{
            flex: "9",
            display: "flex",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
