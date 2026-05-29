import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/shadcn/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/shared/components/shadcn/command";
import { useSidebar } from "@/shared/components/shadcn/sidebar";
import usePermissions from "@/shared/hooks/usePermissions";
import { useIsMobile } from "@/shared/hooks/useMobile";
import { cn } from "@/shared/utils/cn";

import { SEARCH_INDEX } from "../navigation/searchIndex";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const SHORTCUT_LABEL = isMac ? "⌘K" : "Ctrl+K";

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { has } = usePermissions();
  const { state, isMobile: isSidebarMobile, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed" && !isSidebarMobile;

  // Foydalanuvchi ruxsatiga qarab filtrlangan ro'yxat
  const items = useMemo(
    () => SEARCH_INDEX.filter((it) => !it.permission || has(it.permission)),
    [has],
  );

  // Sahifalarni kategoriyaga ajratish (Command Group uchun)
  const grouped = useMemo(() => {
    const map = new Map();
    for (const it of items) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category).push(it);
    }
    return Array.from(map.entries());
  }, [items]);

  // Ctrl+K / Cmd+K global listener
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (url) => {
    setOpen(false);
    navigate(url);
    if (isMobile && isSidebarMobile) toggleSidebar();
  };

  return (
    <>
      {/* Sidebar ichidagi trigger tugmasi */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Sahifa qidirish"
        aria-label="Sahifa qidirish"
        className={cn(
          "flex items-center gap-2 w-full rounded-md border border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors",
          isCollapsed ? "h-8 justify-center px-1.5" : "h-9 px-2.5 text-sm",
        )}
      >
        <Search className="size-4 shrink-0" strokeWidth={1.75} />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left truncate">Qidiruv...</span>
            <kbd className="ml-auto inline-flex items-center gap-0.5 rounded border border-sidebar-border bg-sidebar px-1 py-0.5 text-[10px] font-medium text-sidebar-foreground/60">
              {SHORTCUT_LABEL}
            </kbd>
          </>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden [&>button[type=button]]:hidden">
          <DialogTitle className="sr-only">Sahifa qidirish</DialogTitle>
          <DialogDescription className="sr-only">
            Sahifa nomi yoki kalit so'z bilan qidirib, Enter bilan o'ting
          </DialogDescription>
          <Command
            // Bizning haystack: title + description + keywords + category — title ham return qilamiz,
            // cmdk shu stringni "value" sifatida ishlatadi
            filter={(value, search) =>
              value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
            }
            className="rounded-md"
          >
            <CommandInput
              placeholder="Sahifa nomi, kalit so'z yoki tavsif bo'yicha qidirish..."
              autoFocus
            />
            <CommandList className="max-h-[420px]">
              <CommandEmpty>Hech narsa topilmadi</CommandEmpty>
              {grouped.map(([category, list]) => (
                <CommandGroup key={category} heading={category}>
                  {list.map((it) => {
                    const Icon = it.icon;
                    const haystack = `${it.title} ${it.description} ${it.keywords} ${it.category}`;
                    return (
                      <CommandItem
                        key={it.url}
                        value={haystack}
                        onSelect={() => handleSelect(it.url)}
                        className="flex items-start gap-3 py-2"
                      >
                        {Icon && (
                          <Icon
                            className="size-4 mt-0.5 shrink-0 text-muted-foreground"
                            strokeWidth={1.75}
                          />
                        )}
                        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                          <span className="font-medium text-sm truncate">
                            {it.title}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {it.description}
                          </span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
            <div className="flex items-center justify-between gap-2 border-t px-3 py-2 text-[11px] text-muted-foreground bg-gray-50">
              <span>
                <kbd className="px-1 py-0.5 rounded border bg-white">↑↓</kbd> tanlash
                {"  "}
                <kbd className="ml-2 px-1 py-0.5 rounded border bg-white">Enter</kbd> o'tish
                {"  "}
                <kbd className="ml-2 px-1 py-0.5 rounded border bg-white">Esc</kbd> yopish
              </span>
              <span>{items.length} ta sahifa</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalSearch;
