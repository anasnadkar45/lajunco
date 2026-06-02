import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Client from "@/components/sections/Client";
import PageHeader from "@/components/common/PageHeader";

export default function ClientsPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Our Clients" subtitle="Trusted Partners" />

      <main className="max-w-6xl mx-auto p-6">
        <Client />
      </main>
    </div>
  );
}
