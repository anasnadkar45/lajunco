import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/common/PageHeader";

export default function PatrolsPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Security Patrols" subtitle="Round-the-clock Protection" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-6">
          <p className="mb-4">LAJUN provides mobile security patrols operating around the clock to ensure continuous protection, rapid response to incidents, and enhanced on-site and perimeter security.</p>
          <ul className="list-disc pl-5">
            <li>Wide area and field coverage</li>
            <li>Regular and rapid response patrols</li>
            <li>Immediate incident response and support</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
