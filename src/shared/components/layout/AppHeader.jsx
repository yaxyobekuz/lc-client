// Components
import { useSidebar } from "../shadcn/sidebar";
import NotificationBell from "../notification/NotificationBell";

// Icons
import { TextAlignJustify } from "lucide-react";

// Assets
import { logoIcon } from "@/shared/assets/icons";

const AppHeader = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex items-center justify-between h-12 container sticky top-0 z-30 bg-background shadow-sm md:hidden">
      {/* Hamburger menu */}
      <button onClick={toggleSidebar} className="size-7">
        <TextAlignJustify strokeWidth={1.5} className="size-5" />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          width={24}
          height={24}
          src={logoIcon}
          className="size-6"
          alt="System logo svg"
        />
        <span className="font-medium">Bayyina</span>
      </div>

      {/* Bell */}
      <NotificationBell />
    </header>
  );
};

export default AppHeader;
