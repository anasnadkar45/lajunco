import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import PageHeader from "@/components/common/PageHeader";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Navbar />
      <PageHeader title="Contact" subtitle="Get in touch" />

      <main className="max-w-3xl mx-auto p-6">
        <div className="bg-white/5 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <p className="mb-2">Phone: <a href="tel:0533070700" className="text-primary">0533070700</a> / <a href="tel:0114450211" className="text-primary">0114450211</a></p>
          <p className="mb-2">Emails: <a href="mailto:quotes@lajunco.com" className="text-primary">quotes@lajunco.com</a>, <a href="mailto:info@lajunco.com" className="text-primary">info@lajunco.com</a></p>
          <p className="mt-4">For requests and quotes please email <a href="mailto:quotes@lajunco.com" className="text-primary">quotes@lajunco.com</a></p>
          <p className="mt-2">Website: <a href="https://www.lajunco.com" className="text-primary">www.lajunco.com</a></p>
        </div>
      </main>
    </div>
  );
}
