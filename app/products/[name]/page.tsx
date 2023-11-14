"use client";
import {
  Center,
  Flex,
  Image,
  Text,
  Rating,
  Stack,
  Group,
  Breadcrumbs,
  Anchor,
  Button,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  Divider,
} from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import exampleImage from "@/public/pic/gach.jpg";
import NImage from "next/image";
import Link from "next/link";
import "./index.css";
import "@/app/global.css";

const items = [
  { title: "Mantine", href: "#" },
  { title: "Mantine hooks", href: "#" },
  { title: "use-id", href: "#" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));
import { useRef, useState } from "react";

// min-height: 100vh;
//    position: relative;
//    width: 100%;
//    height: fit-content;
//    z-index: 1;
//    background-color: var(--mantine-color-gray-1);

export default function ProductDetails({
  params,
}: {
  params: { name: String };
}) {
  const handlersRef = useRef<NumberInputHandlers>(null);
  const data = [
    { id: 0, label: "Tất cả" },
    { id: 1, label: "1 sao" },
    { id: 2, label: "2 sao" },
    { id: 3, label: "3 sao" },
    { id: 4, label: "4 sao" },
  ];
  const people = [
    {
      id: 0,
      name: "Khai",
      date: "7/10/2023",
      time: "10:30",
      rating: 3,
      comment: "Quá tốt",
      avatar: "url in here",
    },
    {
      id: 1,
      name: "KhaiKhai",
      date: "10/10/2023",
      time: "6:47",
      rating: 3,
      comment: "Quá dữ",
      avatar: "url in here",
    },
  ];
  const [isChoosing, setIschoosing] = useState(0);
  const handleOnclick = (id: number) => {
    setIschoosing(id);
  };

  return (
    <div className="min-h-max relative h-fit z-1">
      <Breadcrumbs mt={30}>{items}</Breadcrumbs>
      {/* 1 */}
      <Flex className=" w-full h-full">
        <Flex className=" ml-[100px] mr-[100px] h-[279px] w-full flex-row">
          {/* 1 */}
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
              // className={`i-1-sm`}
              className=" h-[80px] md:h-[250px] "
            ></Image>
          </Flex>
          <Flex
            direction={"column"}
            // style={{
            //   flex: 6,
            //   marginLeft: "5px",
            //   backgroundColor: "white",
            //   borderRadius: "10px",
            //   padding: "5px",
            // }}
            className=" p-5 flex-[6] ml-[5px] bg-white rounded-[10px] flex-col h-fit md:h-full"
          >
            {/* 2 */}
            <Flex direction={"column"}>
              <Link href={"/"}>Brand: CMC</Link>
              <Text size="15px" className={`n-t-2-sm`}>
                Gạch Porcelain lát nền kim cương CMC KC89005Gạch Porcelain lát
                nền kim cương CMC KC89005
              </Text>
              <Rating value={3.5} fractions={2} readOnly />
            </Flex>
            <Flex>
              <Text className={`m-t-2 m-t-2-sm`}>00.00</Text>
              <Text className={`s-t-2 s-t-2-sm`}>đ</Text>
            </Flex>
            <Flex>
              <Stack gap={2}>
                <Text>Số lượng</Text>
                <Group gap={5}>
                  <ActionIcon
                    onClick={() => {
                      handlersRef.current?.decrement();
                    }}
                    variant="default"
                  >
                    <IconMinus color="#111111" />
                  </ActionIcon>
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={1000}
                    hideControls
                    handlersRef={handlersRef}
                    step={1}
                    allowNegative={false}
                    clampBehavior="strict"
                  />
                  <ActionIcon
                    variant="default"
                    onClick={() => {
                      handlersRef.current?.increment();
                    }}
                  >
                    <IconPlus color="#111111" />
                  </ActionIcon>
                </Group>
              </Stack>
            </Flex>
            <Flex className=" flex-col lg:flex-row w-full gap-3 mt-7">
              <Button className="w-[110px] lg:w-[300px] bg-[#02B1AB]">
                Mua ngay
              </Button>
              <Button className="w-[180px] lg:w-[300px] bg-white text-[#02B1AB] border-[#02B1AB]">
                Thêm vào giỏ hàng
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* 3 */}
      <Flex className=" mt-[10px] w-full h-full items-center justify-center">
        <Flex className=" w-full h-full flex-col ml-[100px] mr-[100px] bg-white rounded-[10px] p-[20px] box-content">
          <Text className=" font-bold">Thông tin sản phẩm</Text>
          <Text className=" text-[20vm]">
            Gạch lát nền Porcelain kim cương siêu bóng CMC KC89005 Hưng Gia Bình
            - Nhà phân phối sỉ và lẻ các loại gạch men lát nền, gạch đá bóng
            kiếng, gạch trang trí với giá tốt nhất tại Đà Nẵng, Hội An, Quảng
            Nam, Huế, Gia Lai, Kon Tum... Giao hàng tận nơi toàn quốc. Thông số
            kỹ thuật của gạch lát nền 80x80 siêu bóng CMC KC89005:
            <br />- Tên sản phẩm: Gạch Porcerlain kim cương siêu bóng CMC
            KC89005
            <br /> - Chủng loại: Gạch lát nền 80x80 cm - Kích thước: 800 x 800mm
            <br />- Màu sắc: màu đen, vân trắng, giả đá.
            <br /> - Bề mặt: Phẳng - bóng
            <br /> - Công nghệ: Châu Âu - Sản xuất tại Việt Nam.
            <br /> - Chất liệu: Gạch Granite bán sứ - Siêu bóng
          </Text>
        </Flex>
      </Flex>

      <Flex className=" flex-col ml-[100px] mr-[100px] bg-white rounded-[10px] p-[20px] mt-[10px] mb-[20px]">
        <Text className=" font-bold">Đánh giá sản phẩm</Text>
        <Group className="ml-[100px] mr-[100px] justify-center align-middle">
          <Stack className=" gap-1">
            <Text className=" font-bold text-[50px]">3/5</Text>
            <Rating defaultValue={3} readOnly />
            <Text className=" font-normal">2 đánh giá</Text>
          </Stack>
          <Group>
            {data.map((item) => (
              <Button
                className={
                  item.id == isChoosing
                    ? "text-[10px] w-[67px] h-[36px] rounded-[20px] border-[#02B1AB] text-white bg-[#02B1AB]"
                    : "text-[10px] w-[67px] h-[36px] rounded-[20px] border-[#02B1AB] text-black bg-inherit"
                }
                onClick={() => {
                  handleOnclick(item.id);
                }}
              >
                {item.label}
              </Button>
            ))}
          </Group>
        </Group>
        <Stack>
          {people.map((person) => (
            <Stack>
              <Stack className=" gap-1">
                <Group>
                  <Image
                    alt="avt"
                    src={exampleImage}
                    component={NImage}
                    className=" rounded-full w-[35px]"
                  />
                  <Stack className=" gap-0">
                    <Text className="ml-[5px]">{person.name}</Text>
                    <Rating defaultValue={person.rating} readOnly />
                  </Stack>
                </Group>
                <Text className=" ml-[55px] text-[#BBB] text-[12px]">
                  {person.date + " " + person.time}
                </Text>
              </Stack>
              <Text className=" ml-[60px] text-overflow: ellipsis;">
                {person.comment}
              </Text>
              <Divider my="sm" />
            </Stack>
          ))}
        </Stack>
      </Flex>
    </div>
  );
}
