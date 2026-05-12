// State
import { useState } from "react";

// Icons
import { Plus, Search } from "lucide-react";

// Components
import Button from "@/shared/components/ui/button/Button";
import InputField from "@/shared/components/ui/input/InputField";
import ModalWrapper from "@/shared/components/ui/modal/ModalWrapper";
import GroupCard from "../components/GroupCard";
import GroupCreateModal from "../components/modals/GroupCreateModal";

// Hooks
import useModal from "@/shared/hooks/useModal";
import useGroupsListQuery from "../hooks/useGroupsListQuery";

// Constants
import { MODAL } from "@/shared/constants/modals";

const GroupsListPage = () => {
  const [search, setSearch] = useState("");
  const { openModal } = useModal();
  const { data, isLoading } = useGroupsListQuery({ search, limit: 50 });
  const groups = data?.data || [];

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-2xl font-semibold">Guruhlar</h1>

      <div className="flex flex-col gap-4 sm:flex-row">
        <InputField
          name="search"
          type="search"
          value={search}
          placeholder="Guruh nomi bo'yicha qidirish..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button onClick={() => openModal(MODAL.GROUP_CREATE)}>
          <Plus className="size-4" />
          Yangi guruh
        </Button>
      </div>

      {isLoading && (
        <div className="p-8 text-center text-muted-foreground">
          Yuklanmoqda...
        </div>
      )}

      {!isLoading && groups.length === 0 && (
        <div className="border rounded-lg p-12 text-center bg-white">
          <Search className="size-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            Hech qanday guruh topilmadi. "Yangi guruh" tugmasini bosib boshlang.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <GroupCard key={g._id} group={g} />
        ))}
      </div>

      <ModalWrapper name={MODAL.GROUP_CREATE} title="Yangi guruh">
        <GroupCreateModal />
      </ModalWrapper>
    </div>
  );
};

export default GroupsListPage;
