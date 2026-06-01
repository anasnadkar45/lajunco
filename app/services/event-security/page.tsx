import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/common/PageHeader";

export default function EventSecurityPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Event Security" subtitle="Safe & Organized Events" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-6">
          <p className="mb-4">We provide comprehensive event security services including crowd control, access management, security screening, emergency response and on-site support to ensure safe and organized events.</p>
          <p>Suitable for conferences, exhibitions, trade shows, entertainment and street events.</p>
        </div>
      </main>
    </div>
  );
}
