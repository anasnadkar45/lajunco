import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/common/PageHeader";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Security Consulting" subtitle="Assessment & Planning" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-6">
          <p className="mb-4">Certified security consultants provide site assessments, risk analysis, security planning and operational procedure development to raise security performance and efficiency.</p>
          <p>We deliver tailored security plans and operational development to meet facility needs.</p>
        </div>
      </main>
    </div>
  );
}
