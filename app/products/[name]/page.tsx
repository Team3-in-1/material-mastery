import { Center, Flex, Image, Text, Rating, Breadcrumbs, Anchor } from "@mantine/core";
import exampleImage from "@/public/pic/gach.jpg";
import NImage from "next/image";
import Link from "next/link";
import "./index.css";
import "@/app/global.css";

const items = [
	{ title: 'Mantine', href: '#' },
	{ title: 'Mantine hooks', href: '#' },
	{ title: 'use-id', href: '#' },
].map((item, index) => (
	<Anchor href={item.href} key={index}>
		{item.title}
	</Anchor>
));

export default function ProductDetails({
	params,
}: {
	params: { name: String };
}) {
	return (
		<div className={`page-container`}>
			<Breadcrumbs mt={30}>{items}</Breadcrumbs>
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
							className={`i-1-sm`}
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
						<Flex></Flex>
						<Flex></Flex>
					</Flex>
				</Flex>
				<div></div>
				<div></div>
			</Flex>
			{/* 3 */}
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
			{/* 4 */}
			<Flex direction={"column"}>
				{/* 4.1 */}

				{/* 4.2 */}

				{/* 4.3 */}
			</Flex>
		</div>
	);
}
