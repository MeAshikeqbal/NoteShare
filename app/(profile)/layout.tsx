import { DashboardSidebar } from "./_components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <DashboardSidebar/>
            <main
            className="pl-20"
            >
                {children}
                </main>
        </div>
    )
}


