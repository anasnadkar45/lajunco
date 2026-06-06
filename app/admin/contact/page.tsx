import ContactMessageList from "@/components/admin/ContactMessageList";
import { requireAdmin } from "@/lib/require-admin";

export default async function AdminContactPage() {
  await requireAdmin();

  return (
    <main className="grid gap-6">
      <section className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Contact Messages
            </p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">
              Review Inquiries
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              View and manage contact form submissions. Data loads in pages for
              better performance.
            </p>
          </div>
        </div>
      </section>

      <ContactMessageList />
    </main>
  );
}
