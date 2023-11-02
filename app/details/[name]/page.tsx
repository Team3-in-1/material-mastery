import { Center, Flex, Image } from "@mantine/core";
import exampleImage from "@/public/pic/gach.jpg";
import NImage from "next/image";

export default function ProductDetails({
  params,
}: {
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
      <Flex style={{ marginTop: 120 }} w={"100%"} h={"100%"}>
        <Flex
          direction={"row"}
          h={179}
          w={"100%"}
          style={{ marginLeft: "100px", marginRight: "100px " }}
        >
          <Flex
            justify={"center"}
            align={"center"}
            style={{
              backgroundColor: "white",
              marginRight: "10px",
              borderRadius: "10px",
            }}
            w={500}
            h={"100%"}
          >
            <Image
              alt="img"
              src={exampleImage}
              component={NImage}
              height={150}
            ></Image>
          </Flex>
          <div
            style={{
              width: "100%",
              height: "100%",
              marginLeft: "5px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            Hello
          </div>
        </Flex>
        <div></div>
        <div></div>
      </Flex>
    </div>
  );
}
