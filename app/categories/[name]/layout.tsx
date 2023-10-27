import { Flex, ScrollArea } from "@mantine/core";
import { CategoryNav } from "@/components/CategoryNav/categoryNav";
import { FC } from "react";

const data = [{ label: "Brick" }, { label: "Furniture" }];

export default function CategoriesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: String };
}) {
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
            <CategoryNav data={data} name={params.name}></CategoryNav>
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
