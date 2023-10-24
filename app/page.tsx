import { Flex, ScrollArea } from "@mantine/core";
import { CategoryNav } from "@/components/CategoryNav/categoryNav";
import { CategoryCards } from "@/components/CategoryCards/categoryCards";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
        height: "100%",
        zIndex: 1,
        backgroundColor: "var(--mantine-color-gray-1)",
        // boxShadow: 'var(--mantine-shadow-md)'
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
            <CategoryNav></CategoryNav>
          </div>
          <div
            style={{
              flex: 7,
              display: "flex",
            }}
          >
            <CategoryCards
              data={[
                { name: "Gạch lót sàn" },
                { name: "Gạch lót tường" },
                // { name: "Gạch lót tường" },
                // { name: "Gạch lót tường" },
                // { name: "Gạch lót tường" },
                // { name: "Gạch lót tường" },
              ]}
            ></CategoryCards>
          </div>
        </div>
      </div>
    </div>
  );
}
