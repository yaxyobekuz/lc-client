import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, GraduationCap, User, Users } from "lucide-react";

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
import useDebounce from "@/shared/hooks/useDebounce";
import { useIsMobile } from "@/shared/hooks/useMobile";
import { cn } from "@/shared/utils/cn";
import { formatPhone } from "@/shared/utils/formatPhone";

import useGlobalSearchQuery from "../hooks/useGlobalSearchQuery";
import { SEARCH_INDEX } from "../navigation/searchIndex";

const isMac =
  typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const SHORTCUT_LABEL = isMac ? "⌘K" : "Ctrl+K";

const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  // Foydalanuvchi yozayotgan matn - server qidiruvi shu asosida ishlaydi (debounce bilan)
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 250);
  const navigate = useNavigate();
  const { has } = usePermissions();
  const { state, isMobile: isSidebarMobile, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed" && !isSidebarMobile;

  const canSearchData = has("users.read");
  const { data: results, isFetching } = useGlobalSearchQuery(
    canSearchData ? debouncedTerm : "",
  );

  // Foydalanuvchi ruxsatiga qarab filtrlangan sahifalar ro'yxati
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

  // Oyna ochilish holatini o'zgartiradi; yopilganda qidiruv matnini tozalaymiz
  const handleOpenChange = (next) => {
    setOpen(next);
    if (!next) setTerm("");
  };

  const go = (url) => {
    setOpen(false);
    navigate(url);
    if (isMobile && isSidebarMobile) toggleSidebar();
  };

  const students = results?.students || [];
  const teachers = results?.teachers || [];
  const groups = results?.groups || [];
  const hasDataResults =
    students.length > 0 || teachers.length > 0 || groups.length > 0;
  const searching = term.trim().length >= 2;

  return (
    <>
      {/* Sidebar ichidagi trigger tugmasi */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Qidirish"
        aria-label="Qidirish"
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

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-xl p-0 gap-0 overflow-hidden [&>button[type=button]]:hidden">
          <DialogTitle className="sr-only">Qidirish</DialogTitle>
          <DialogDescription className="sr-only">
            O'quvchi, o'qituvchi, guruh yoki sahifa nomini yozing
          </DialogDescription>
          <Command
            shouldFilter={false}
            className="rounded-md"
          >
            <CommandInput
              value={term}
              onValueChange={setTerm}
              placeholder="O'quvchi, guruh, sahifa nomi yoki telefon..."
              autoFocus
            />
            <CommandList className="max-h-[420px]">
              <CommandEmpty>
                {searching && isFetching
                  ? "Qidirilmoqda..."
                  : "Hech narsa topilmadi"}
              </CommandEmpty>

              {/* Server natijalari: o'quvchilar */}
              {students.length > 0 && (
                <CommandGroup heading="O'quvchilar">
                  {students.map((s) => (
                    <CommandItem
                      key={`student-${s._id}`}
                      value={`student-${s._id}`}
                      onSelect={() => go(`/owner/users/${s._id}`)}
                      className="flex items-center gap-3 py-2"
                    >
                      <GraduationCap
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.75}
                      />
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className="font-medium text-sm truncate">
                          {s.firstName} {s.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {formatPhone(s.phone) || "Telefon yo'q"}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Server natijalari: guruhlar */}
              {groups.length > 0 && (
                <CommandGroup heading="Guruhlar">
                  {groups.map((g) => (
                    <CommandItem
                      key={`group-${g._id}`}
                      value={`group-${g._id}`}
                      onSelect={() => go(`/owner/groups/${g._id}`)}
                      className="flex items-center gap-3 py-2"
                    >
                      <Users
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.75}
                      />
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className="font-medium text-sm truncate">
                          {g.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {g.studentsCount} o'quvchi
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Server natijalari: o'qituvchilar */}
              {teachers.length > 0 && (
                <CommandGroup heading="O'qituvchilar">
                  {teachers.map((t) => (
                    <CommandItem
                      key={`teacher-${t._id}`}
                      value={`teacher-${t._id}`}
                      onSelect={() => go(`/owner/users/${t._id}`)}
                      className="flex items-center gap-3 py-2"
                    >
                      <User
                        className="size-4 shrink-0 text-muted-foreground"
                        strokeWidth={1.75}
                      />
                      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                        <span className="font-medium text-sm truncate">
                          {t.firstName} {t.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {formatPhone(t.phone) || "Telefon yo'q"}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Statik sahifalar - faqat ma'lumot natijalari bo'lmasa, joyni egallab ketmasin */}
              {(!searching || !hasDataResults) &&
                grouped.map(([category, list]) => {
                  // qidiruv matniga mos sahifalarni ko'rsatamiz (oddiy substring)
                  const filtered = searching
                    ? list.filter((it) =>
                        `${it.title} ${it.description} ${it.keywords}`
                          .toLowerCase()
                          .includes(term.trim().toLowerCase()),
                      )
                    : list;
                  if (filtered.length === 0) return null;
                  return (
                    <CommandGroup key={category} heading={category}>
                      {filtered.map((it) => {
                        const Icon = it.icon;
                        return (
                          <CommandItem
                            key={it.url}
                            value={it.url}
                            onSelect={() => go(it.url)}
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
                  );
                })}
            </CommandList>
            <div className="flex items-center justify-between gap-2 border-t px-3 py-2 text-[11px] text-muted-foreground bg-gray-50">
              <span>
                <kbd className="px-1 py-0.5 rounded border bg-white">↑↓</kbd> tanlash
                {"  "}
                <kbd className="ml-2 px-1 py-0.5 rounded border bg-white">Enter</kbd> o'tish
                {"  "}
                <kbd className="ml-2 px-1 py-0.5 rounded border bg-white">Esc</kbd> yopish
              </span>
              <span>
                {searching
                  ? "O'quvchi · guruh · sahifa"
                  : `${items.length} ta sahifa`}
              </span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalSearch;
