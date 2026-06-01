import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/common/PageHeader";

export default function SurveillancePage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Surveillance Systems" subtitle="Advanced Monitoring" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-6">
          <p className="mb-4">We deploy advanced CCTV systems, central control rooms and smart analytics for 24/7 live monitoring, high definition cameras, night vision and AI-assisted video analytics.</p>
          <ul className="list-disc pl-5">
            <li>Centralized monitoring & control</li>
            <li>Video analytics & AI insights</li>
            <li>Live 24/7 monitoring and rapid threat detection</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
