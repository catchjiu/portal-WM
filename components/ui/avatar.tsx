import { getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
}

export function Avatar({ name }: AvatarProps) {
  return (
    <div className="flex size-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-sm font-semibold text-cyan-200">
      {getInitials(name)}
    </div>
  );
}
