import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/common/PageHeader";

export default function AccessControlPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Access Control" subtitle="Comprehensive Entry Management" />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-6">
          <p className="mb-4">We provide integrated access control solutions to manage movement of people, visitors, vehicles and goods. Systems include metal detector gates, biometric and card systems, and structured procedures to ensure high levels of security and discipline.</p>
          <ul className="list-disc pl-5">
            <li>Visitor management & verification</li>
            <li>Vehicle access control</li>
            <li>Goods screening & management</li>
            <li>Centralized management and instant reports</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
