import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Profile } from "@/lib/types/domain";

const beltColors: Record<Profile["rank"], string> = {
  White: "from-slate-200 to-slate-400 text-slate-950",
  Blue: "from-blue-500 to-blue-700 text-white",
  Purple: "from-violet-500 to-violet-700 text-white",
  Brown: "from-amber-700 to-orange-900 text-white",
  Black: "from-slate-900 to-black text-white",
};

export function RankBadge({ profile }: { profile: Profile }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rank</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`rounded-3xl bg-gradient-to-r px-5 py-4 shadow-lg ${beltColors[profile.rank]}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] opacity-75">
                Belt
              </p>
              <p className="font-heading text-3xl uppercase tracking-[0.16em]">
                {profile.rank}
              </p>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 4 }, (_, index) => (
                <span
                  className={`h-8 w-2 rounded-full ${
                    index < profile.stripes ? "bg-white/90" : "bg-white/25"
                  }`}
                  key={`${profile.id}-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Badge>{profile.membershipStatus}</Badge>
          <Badge className="border-cyan-400/30 text-cyan-200">
            {profile.remainingClasses} classes left
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
