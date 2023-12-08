
import SideBar from "@/components/SideBar/SideBar"
import { Button, Group } from "@mantine/core";


export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <Group w='100%' h='100%' pos='fixed' className="z-[2]" bg='white' pt={72} gap='0' wrap='nowrap'>
            <SideBar from='staff' />
            {children}
        </Group>
    )
}