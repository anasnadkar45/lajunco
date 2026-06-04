import ContactMessageList from "../../../components/admin/ContactMessageList";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export default async function AdminContactPage() {
  await requireAdmin();

  const rawMessages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  }) || [];

  const messages = rawMessages.map((message) => ({
    ...message,
    createdAt: message.createdAt.toISOString(),
  }));

  return (
    <main className="grid gap-6">
      <section className="rounded-md border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Contact Messages
            </p>
            <h1 className="mt-2 text-2xl font-bold text-foreground">
              Review incoming inquiries
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              View and delete contact form submissions from the website.
            </p>
          </div>
          <div className="rounded-2xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
            {messages.length} message{messages.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      <ContactMessageList initialMessages={messages} />
    </main>
  );
}
