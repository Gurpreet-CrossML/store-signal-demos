import DashboardClient from "@/clients/dashboard";

export default function Dashboard() {
  return (
    <main className="flex flex-col justify-start items-start w-full h-full">
      <DashboardClient />
    </main>
  )
}