import "@mantine/core/styles.css";
import "./global.css";
import '@mantine/carousel/styles.css';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import TanStackProvider from "@/services/TanStackProvider";
import { theme } from "@/theme";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import BottomNavBar from "@/components/Mobile/BottomNavBar/bottomNavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Material Mastery",
  description: "This is our project for 3 subject",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="shortcut icon" href="/display-icon.svg" />
      </head>

      <body
        className={inter.className}
        style={{ backgroundColor: "var(--mantine-color-gray-1)" }}
      >
        <TanStackProvider>
          <MantineProvider theme={theme} defaultColorScheme="light">
            <Header />
            {children}
            <Footer />
            <BottomNavBar />
          </MantineProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
