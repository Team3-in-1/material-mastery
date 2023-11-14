import { Container } from "@mantine/core";

import "../global.css";

export default function ProductsLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`page-container`}>
			<Container fluid py={70} px={100}>
				<div className='mt-4'>
					{children}
				</div>
			</Container>
		</div>
	);
}
