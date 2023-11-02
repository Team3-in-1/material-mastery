import { Flex, ScrollArea } from "@mantine/core";
import { CategoryNav } from "@/components/CategoryNav/categoryNav";
import { FC } from "react";
import { findIndex } from "@/utils/array";

const data = [{ label: "Gach men" }, { label: "Gach lot tuong" }];

export default function ProductsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: String };
}) {
  console.log(params.name);
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
        height: "fit-content",
        zIndex: 1,
        backgroundColor: "var(--mantine-color-gray-1)",
        // boxShadow: 'var(--mantine-shadow-md)'
      }}
    >
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
          <div
            className="hidden-mobile"
            style={{
              flex: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CategoryNav
              data={data}
              id={findIndex(data, params.name)}
            ></CategoryNav>
          </div>
          <div
            style={{
              flex: 7,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
