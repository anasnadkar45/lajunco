import PageHeader from "@/components/common/PageHeader";
import ContactSection from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Contact" subtitle="Get in touch" />
      <ContactSection />
    </div>
  );
}
