import Card from "@/shared/components/ui/card/Card";
import Badge from "@/shared/components/ui/badge/Badge";
import { ROLES, ROLE_LABELS } from "@/shared/constants/roles";
import { formatPhone } from "@/shared/utils/formatPhone";
import { formatDateUz } from "@/shared/utils/formatDate";
import { calculateAge } from "@/shared/utils/calculateAge";

const GENDER_LABEL = { male: "Erkak", female: "Ayol" };

const Row = ({ label, value, muted = false }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className={muted ? "text-muted-foreground" : "font-medium"}>
      {value || "-"}
    </p>
  </div>
);

const UserProfileCard = ({ profile }) => {
  if (!profile) return null;

  const initial =
    (profile.firstName?.[0] || profile.username?.[0] || "?").toUpperCase();
  const isStudent = profile.role === ROLES.STUDENT;
  const isTeacher = profile.role === ROLES.TEACHER;

  const age = profile.age ?? calculateAge(profile.birthDate);

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground text-xl font-semibold uppercase">
          {initial}
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">
              {ROLE_LABELS[profile.role] || profile.role}
            </Badge>
            {profile.isActive ? (
              <Badge className="bg-green-100 text-green-700">Faol</Badge>
            ) : (
              <Badge variant="outline">Nofaol</Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t">
        <Row label="Login" value={`@${profile.username}`} />
        <Row label="Telefon" value={formatPhone(profile.phone)} />
        <Row
          label="Tug'ilgan sana"
          value={
            profile.birthDate
              ? `${formatDateUz(profile.birthDate)}${age != null ? ` (${age} yosh)` : ""}`
              : null
          }
        />
        <Row label="Jinsi" value={GENDER_LABEL[profile.gender]} />

        {isStudent && (
          <>
            <Row label="Manzil" value={profile.address} />
            <Row
              label="Ro'yxatga olingan"
              value={formatDateUz(profile.enrolledAt)}
            />
            <Row label="Ota-ona ismi" value={profile.parentName} />
            <Row
              label="Ota-ona telefoni"
              value={formatPhone(profile.parentPhone)}
            />
            <Row
              label="Lead manbasi"
              value={
                profile.leadSource ? (
                  <span>
                    {profile.leadSource.name}
                    {profile.leadSource.isActive === false && (
                      <span className="text-muted-foreground ml-1">
                        (arxiv)
                      </span>
                    )}
                  </span>
                ) : null
              }
            />
          </>
        )}

        {isTeacher && (
          <>
            <Row
              label="Ishga olingan"
              value={
                profile.hiredAt
                  ? `${formatDateUz(profile.hiredAt)}${
                      profile.years != null
                        ? ` (${profile.years} yil staj)`
                        : ""
                    }`
                  : null
              }
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default UserProfileCard;
