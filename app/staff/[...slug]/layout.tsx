import SideBar from "@/components/SideBar/SideBar"
import { Group } from "@mantine/core";


export default function StaffLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { slug: string[] };
}) {

    return (
        <Group w='100%' h='100%' pos='fixed' className="z-[2]" bg='white' pt={72} gap='0'>
            <SideBar currentSlug={params.slug} mainSlug='staff' />
            {children}
        </Group>
    )
}