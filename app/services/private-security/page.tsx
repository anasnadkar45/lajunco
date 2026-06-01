import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/common/PageHeader";

export default function PrivateSecurityPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Private Security" subtitle="Discreet Protection" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-6">
          <p className="mb-4">Specialized security for residences and VIP facilities, focusing on privacy, professional presence and rapid response to ensure safety and discretion.</p>
          <p>Services include personal protection, privacy safeguards and tailored security details.</p>
        </div>
      </main>
    </div>
  );
}
