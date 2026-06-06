"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";

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

type PaginationData = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export default function ContactMessageList() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [purposes, setPurposes] = useState<string[]>([]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch messages
  useEffect(() => {
    fetchMessages(1);
  }, [debouncedSearch, purposeFilter]);

  async function fetchMessages(page: number) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page.toString());
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (purposeFilter && purposeFilter !== "all") {
        params.set("purpose", purposeFilter);
      }

      const res = await fetch(`/api/admin/contact-messages?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setMessages(data.messages);
      setPagination(data.pagination);

      // Extract unique purposes on first load
      if (purposes.length === 0 && data.messages.length > 0) {
        const uniquePurposes = [
          ...new Set(data.messages.map((m: ContactMessage) => m.purpose)),
        ] as string[];
        setPurposes(uniquePurposes.sort());
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Delete this message? This action cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch("/api/admin/contact-messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message || "Failed to delete message");
      }

      setMessages((current) => current.filter((message) => message.id !== id));
      setPagination((p) => ({ ...p, total: p.total - 1 }));
    } catch (error) {
      console.error(error);
      window.alert("Unable to delete the message. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchMessages(newPage);
    }
  }

  if (loading && messages.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center text-muted-foreground">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Purpose
          </label>
          <select
            value={purposeFilter}
            onChange={(e) => {
              setPurposeFilter(e.target.value);
            }}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Purposes</option>
            {purposes.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {messages.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No messages found. Try adjusting your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Purpose
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-foreground">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {messages.map((message) => (
                  <tr
                    key={message.id}
                    className="transition hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-foreground">
                          {message.fullName}
                        </p>
                        {message.company && (
                          <p className="text-xs text-muted-foreground">
                            {message.company}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${message.email}`}
                        className="text-primary hover:underline"
                      >
                        {message.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold text-secondary-foreground">
                        {message.purpose}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {message.city ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin size={14} />
                          {message.city}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {message.cvFileUrl && (
                          <a
                            href={message.cvFileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary/20"
                            title="Download CV"
                          >
                            <Download size={14} />
                            CV
                          </a>
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={deletingId === message.id}
                          onClick={() => handleDelete(message.id)}
                          className="h-8 px-3 text-xs"
                        >
                          <Trash2 size={14} />
                          {deletingId === message.id ? "Deleting…" : "Delete"}
                        </Button>

                        {/* Expand for details */}
                        <details className="group">
                          <summary className="inline-flex cursor-pointer items-center justify-center rounded-md bg-muted/50 p-2 text-xs hover:bg-muted">
                            <ExternalLink size={14} />
                          </summary>
                          <div className="absolute right-0 z-10 mt-2 w-80 space-y-3 rounded-lg border border-border bg-card p-4 shadow-lg">
                            <div>
                              <p className="text-xs font-semibold uppercase text-muted-foreground">
                                Message
                              </p>
                              <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-foreground">
                                {message.message}
                              </p>
                            </div>

                            {message.phone && (
                              <div>
                                <p className="text-xs font-semibold uppercase text-muted-foreground">
                                  Phone
                                </p>
                                <a
                                  href={`tel:${message.phone}`}
                                  className="text-xs text-primary hover:underline"
                                >
                                  {message.phone}
                                </a>
                              </div>
                            )}

                            {message.guards && (
                              <div>
                                <p className="text-xs font-semibold uppercase text-muted-foreground">
                                  Guards Required
                                </p>
                                <p className="text-xs text-foreground">
                                  {message.guards}
                                </p>
                              </div>
                            )}

                            {message.cvFileName && (
                              <div className="rounded-md border border-border bg-muted/30 p-2">
                                <p className="text-xs font-semibold text-foreground">
                                  {message.cvFileName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Uploaded CV / Resume
                                </p>
                              </div>
                            )}
                          </div>
                        </details>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-card px-6 py-4 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {(pagination.page - 1) * pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-foreground">
              {Math.min(
                pagination.page * pagination.pageSize,
                pagination.total
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {pagination.total}
            </span>{" "}
            messages
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1 || loading}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft size={16} />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }).map(
                (_, i) => {
                  const pageNum =
                    pagination.page <= 3
                      ? i + 1
                      : pagination.page - 2 + i;

                  if (pageNum > pagination.totalPages) return null;

                  return (
                    <Button
                      key={pageNum}
                      variant={
                        pageNum === pagination.page ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                      className="h-9 w-9 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                }
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages || loading}
              className="h-9 w-9 p-0"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
