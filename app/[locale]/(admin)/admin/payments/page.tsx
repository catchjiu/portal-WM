import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminPayments } from "@/lib/mock/queries";
import { formatCurrency } from "@/lib/utils";

export default async function AdminPaymentsPage() {
  const payments = await getAdminPayments();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment proof review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {payments.map((payment) => (
          <div
            className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-950/40 p-4 lg:grid-cols-[1.2fr_0.7fr_0.7fr]"
            key={payment.id}
          >
            <div className="space-y-2">
              <p className="font-medium text-white">{payment.memberName}</p>
              <p className="text-sm text-slate-400">{payment.id}</p>
              <p className="text-sm text-slate-300">{formatCurrency(payment.amount)}</p>
            </div>
            <div className="space-y-3">
              <Badge>{payment.status}</Badge>
              {payment.proofPreviewUrl ? (
                <a
                  className="block text-sm text-cyan-300 underline underline-offset-4"
                  href={payment.proofPreviewUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  View proof image
                </a>
              ) : (
                <span className="block text-sm text-slate-500">No proof uploaded</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline">
                Reject
              </Button>
              <Button className="flex-1">Approve</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
