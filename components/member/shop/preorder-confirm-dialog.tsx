"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PreorderConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export function PreorderConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
}: PreorderConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 p-4 sm:items-center">
      <Card className="w-full max-w-md space-y-5">
        <div>
          <h3 className="font-heading text-2xl uppercase tracking-[0.14em] text-white">
            Preorder Notice
          </h3>
          <p className="mt-3 text-sm text-slate-400">{message}</p>
        </div>
        <div className="flex gap-3">
          <Button className="flex-1" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={onConfirm}>
            I understand
          </Button>
        </div>
      </Card>
    </div>
  );
}
