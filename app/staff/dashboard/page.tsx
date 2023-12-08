import { redirect } from "next/navigation";
export default async function DashboardPage({ params }: { params: string }) {
    redirect('/staff/dashboard/revenue')
}