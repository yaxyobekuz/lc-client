import { useOutletContext } from "react-router-dom";
import {
  UserProfileCard,
  UserActiveGroupsList,
  UserTaughtGroupsList,
  UserTelegramCard,
} from "@/shared/components/userProfile";
import UserPasswordCard from "../UserPasswordCard";
import { ROLES } from "@/shared/constants/roles";

const UserProfilePanel = () => {
  const { profile } = useOutletContext();
  const isStudent = profile.role === ROLES.STUDENT;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-4 lg:gap-6">
      <div className="lg:col-span-2 space-y-5">
        <UserProfileCard profile={profile} />
      </div>
      <div className="space-y-5">
        <UserPasswordCard user={profile} />
        <UserTelegramCard telegram={profile.telegram} />
        {isStudent && (
          <UserActiveGroupsList
            studentId={profile._id}
            activeGroups={profile.activeGroups || []}
            ownerLinks
          />
        )}
        {profile.role === ROLES.TEACHER && (
          <UserTaughtGroupsList groups={profile.groups || []} ownerLinks />
        )}
      </div>
    </div>
  );
};

export default UserProfilePanel;
