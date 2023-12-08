import { redirect } from "next/navigation";
export default async function StaffPage({ params }: { params: string }) {
    redirect('/staff/dashboard')
}