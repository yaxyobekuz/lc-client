// Router
import { Outlet } from "react-router-dom";

// Components
import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/shadcn/sidebar";
import AppHeader from "@/shared/components/layout/AppHeader";
import AppSidebar from "@/shared/components/layout/AppSidebar";
import SystemNotificationBell from "@/shared/components/systemNotification/SystemNotificationBell";

// Hooks
import useAuth from "@/shared/hooks/useAuth";

const DashboardLayout = () => {
  const { isOwner } = useAuth();

  return (
    <SidebarProvider className="relative z-10">
      <AppSidebar />
      <SidebarInset>
        <AppHeader />

        {/* Desktop yuqori panel — qo'ng'iroq (owner) */}
        {isOwner && (
          <div className="hidden md:flex items-center justify-end h-12 px-4 sticky top-0 z-30 bg-white border-b">
            <SystemNotificationBell />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4 p-4 md:py-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
