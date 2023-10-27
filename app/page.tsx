import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
        height: "fit-content",
        zIndex: 1,
        backgroundColor: "var(--mantine-color-gray-1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // boxShadow: 'var(--mantine-shadow-md)'
      }}
    >
      <Link href="/categories/brick">Products</Link>
    </div>
  );
}
