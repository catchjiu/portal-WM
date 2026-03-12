import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getAdminMembers } from "@/lib/mock/queries";

export default function AdminMembersPage() {
  const members = getAdminMembers();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle>Member management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {members.map((member) => (
            <div
              className="grid gap-2 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 md:grid-cols-4"
              key={member.id}
            >
              <div>
                <p className="font-medium text-white">
                  {member.firstName} {member.lastName}
                </p>
                <p className="text-sm text-slate-400">{member.rank} belt</p>
              </div>
              <p className="text-sm text-slate-300">{member.membershipStatus}</p>
              <p className="text-sm text-slate-300">{member.remainingClasses} classes left</p>
              <p className="text-sm text-slate-300">{member.matHours.toFixed(1)} mat hours</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create or update package</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Package name" />
          <Input placeholder="Allowed age group" />
          <Input placeholder="Weekday / Weekend / Any" />
          <Input placeholder="Weekly class limit" />
          <button className="h-10 rounded-xl bg-cyan-400 px-4 text-sm font-medium text-slate-950" type="button">
            Save package
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
