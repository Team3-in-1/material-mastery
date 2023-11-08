import { Center, Flex, Image, Text, Rating } from "@mantine/core";
import exampleImage from "@/public/pic/gach.jpg";
import NImage from "next/image";
import Link from "next/link";

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
      }}
    >
      {/* 1 */}
      <Flex style={{ marginTop: 120 }} w={"100%"} h={"100%"}>
        <Flex
          direction={"row"}
          h={179}
          w={"100%"}
          style={{
            marginLeft: "100px",
            marginRight: "100px ",
          }}
        >
          <Flex
            justify={"center"}
            align={"center"}
            style={{
              backgroundColor: "white",
              marginRight: "10px",
              borderRadius: "10px",
              flex: 4,
            }}
          >
            <Image
              alt="img"
              src={exampleImage}
              component={NImage}
              height={150}
            ></Image>
          </Flex>
          <Flex
            direction={"column"}
            style={{
              flex: 6,
              marginLeft: "5px",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            <Flex direction={"column"}>
              <Link href={"/"}>Brand: CMC</Link>
              <Text size="15px">
                Gạch Porcelain lát nền kim cương CMC KC89005Gạch Porcelain lát
                nền kim cương CMC KC89005
              </Text>
              <Rating value={3.5} fractions={2} readOnly />
            </Flex>
            <Flex>
              <div
                style={{
                  color: "#252525",
                  fontSize: 32,
                  fontFamily: "Inter",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                00.00
              </div>
              <div
                style={{
                  color: "#252525",
                  fontSize: 16,
                  fontFamily: "Inter",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                đ
              </div>
            </Flex>
            <Flex></Flex>
            <Flex></Flex>
          </Flex>
        </Flex>
        <div></div>
        <div></div>
      </Flex>
      {/* 2 */}
      <Flex
        style={{ marginTop: 30 }}
        w={"100%"}
        h={"100%"}
        align={Center}
        justify={Center}
      >
        <Flex
          w={"100%"}
          h={"100%"}
          style={{
            marginLeft: "100px",
            marginRight: "100px ",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "15px",
            boxSizing: "content-box",
          }}
          direction={"column"}
        >
          <h5>Thông tin sản phẩm</h5>
          <p style={{ fontSize: "20vm" }}>
            Gạch lát nền Porcelain kim cương siêu bóng CMC KC89005 Hưng Gia Bình
            - Nhà phân phối sỉ và lẻ các loại gạch men lát nền, gạch đá bóng
            kiếng, gạch trang trí với giá tốt nhất tại Đà Nẵng, Hội An, Quảng
            Nam, Huế, Gia Lai, Kon Tum... Giao hàng tận nơi toàn quốc. Thông số
            kỹ thuật của gạch lát nền 80x80 siêu bóng CMC KC89005: - Tên sản
            phẩm: Gạch Porcerlain kim cương siêu bóng CMC KC89005 - Chủng loại:
            Gạch lát nền 80x80 cm - Kích thước: 800 x 800mm - Màu sắc: màu đen,
            vân trắng, giả đá. - Bề mặt: Phẳng - bóng - Công nghệ: Châu Âu - Sản
            xuất tại Việt Nam. - Chất liệu: Gạch Granite bán sứ - Siêu bóng
          </p>
        </Flex>
      </Flex>
      {/* 3 */}
      <Flex direction={"column"}>
        {/* 3.1 */}

        {/* 3.2 */}

        {/* 3.3 */}
      </Flex>
    </div>
  );
}
