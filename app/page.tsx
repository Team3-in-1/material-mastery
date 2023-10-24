import { ScrollArea } from "@mantine/core";
import { CategoryNav } from "@/components/CategoryNav/categoryNav";

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
      <CategoryNav></CategoryNav>
    </div>
  );
}
