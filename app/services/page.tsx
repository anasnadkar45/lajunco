import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Service from "@/components/sections/Service";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Our Services" subtitle="What We Offer" />

      <main className="max-w-6xl mx-auto p-6">
        <Service />

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Detailed Services</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link href="/services/access-control" className="text-primary">Access Control</Link></li>
            <li><Link href="/services/event-security" className="text-primary">Event Security</Link></li>
            <li><Link href="/services/surveillance" className="text-primary">Surveillance Systems</Link></li>
            <li><Link href="/services/security-patrols" className="text-primary">Security Patrols</Link></li>
            <li><Link href="/services/private-security" className="text-primary">Private Security</Link></li>
            <li><Link href="/services/security-consulting" className="text-primary">Security Consulting</Link></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
