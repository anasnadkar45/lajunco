"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Briefcase, FileText, Trash2, CalendarDays } from "lucide-react"

type ContactMessage = {
    id: number;
    purpose: string;
    fullName: string;
    email: string;
    phone?: string | null;
    city?: string | null;
    company?: string | null;
    guards?: string | null;
    message: string;
    cvFileName?: string | null;
    cvFileType?: string | null;
    cvFileUrl?: string | null;
    createdAt: string;
};

type ContactMessageListProps = {
    initialMessages: ContactMessage[]
}

export default function ContactMessageList({ initialMessages }: ContactMessageListProps) {
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages)
    const [deletingId, setDeletingId] = useState<number | null>(null)

    async function handleDelete(id: number) {
        const confirmed = window.confirm("Delete this message? This action cannot be undone.")
        if (!confirmed) return

        setDeletingId(id)

        try {
            const res = await fetch("/api/admin/contact-messages", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })

            if (!res.ok) {
                const body = await res.json().catch(() => null)
                throw new Error(body?.message || "Failed to delete message")
            }

            setMessages((current) => current.filter((message) => message.id !== id))
        } catch (error) {
            console.error(error)
            window.alert("Unable to delete the message. Please try again.")
        } finally {
            setDeletingId(null)
        }
    }

    if (messages.length === 0) {
        return (
            <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
                No contact submissions have been received yet.
            </div>
        )
    }

    return (
        <div className="grid gap-5">
            {messages.map((message) => (
                <article
                    key={message.id}
                    className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                >
                    <div className="border-b border-border bg-muted/30 p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                                    {message.purpose}
                                </p>

                                <h2 className="mt-2 text-xl font-bold text-foreground">
                                    {message.fullName}
                                </h2>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {new Date(message.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                                    <CalendarDays size={14} />
                                    ID #{message.id}
                                </span>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    disabled={deletingId === message.id}
                                    onClick={() => handleDelete(message.id)}
                                >
                                    <Trash2 size={14} />
                                    {deletingId === message.id ? "Deleting…" : "Delete"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 p-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-3xl border border-border bg-background p-4">
                            <div className="space-y-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-primary" />
                                    <span className="break-all">{message.email}</span>
                                </div>

                                {message.phone ? (
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} className="text-primary" />
                                        <span>{message.phone}</span>
                                    </div>
                                ) : null}

                                {message.city ? (
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-primary" />
                                        <span>{message.city}</span>
                                    </div>
                                ) : null}

                                {message.company ? (
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={16} className="text-primary" />
                                        <span>{message.company}</span>
                                    </div>
                                ) : null}

                                {message.guards ? (
                                    <div className="rounded-2xl bg-muted px-4 py-3">
                                        <p className="text-xs font-semibold uppercase text-muted-foreground">
                                            Guards Required
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-foreground">
                                            {message.guards}
                                        </p>
                                    </div>
                                ) : null}

                                {message.cvFileName ? (
                                    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <FileText size={18} />
                                            </span>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-foreground">
                                                    {message.cvFileName}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Uploaded CV / Resume
                                                </p>
                                            </div>
                                        </div>

                                        {message.cvFileUrl ? (
                                            <a
                                                href={message.cvFileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="shrink-0 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                                            >
                                                Open
                                            </a>
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-background p-4">
                            <p className="text-sm font-semibold text-foreground">Message</p>
                            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                                {message.message}
                            </p>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    )
}
