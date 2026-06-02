import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import PageHeader from "@/components/common/PageHeader";

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            <Topbar />
            <Navbar />
            {/* <PageHeader title="About LAJUN Security" subtitle="Company Profile" /> */}
            <About />

            <section className="bg-white py-16">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
                        <div className="space-y-6">
                            <p className="text-sm uppercase tracking-[0.35em] text-primary">Lajoun Security and Guarding Company</p>
                            <p className="text-lg leading-8 text-slate-700">
                                A Saudi company specializing in providing integrated security solutions for all sectors.
                                We started with a clear objective: to build a professional security system that aligns with the
                                requirements of the Kingdom's Vision 2030 and meets the growing needs of the Saudi market.
                                Today, we have a presence in all thirteen regions of the Kingdom, serving hundreds of clients in
                                the industrial, commercial, and governmental sectors.
                            </p>

                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                                <h2 className="text-2xl font-semibold text-slate-900">Vision</h2>
                                <p className="mt-3 text-slate-700">
                                    To be the trusted security choice for various establishments and sectors, by providing professional
                                    security guard services based on discipline, readiness, and rapid response, which contributes to
                                    enhancing safety, protecting individuals and property, and raising the level of confidence of our clients.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                                <h2 className="text-2xl font-semibold text-slate-900">Message</h2>
                                <p className="mt-3 text-slate-700">
                                    Providing high-quality security solutions through qualified personnel, disciplined operating methodologies,
                                    and effective field supervision, ensuring continuity of performance, raising protection efficiency, and providing
                                    a reliable security experience that reflects the professionalism of our clients and maintains the safety of their facilities.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                                <h2 className="text-2xl font-semibold text-slate-900">Management Team</h2>
                                <p className="mt-3 text-slate-700">
                                    Lujon leads a team of Saudi specialists with extensive experience in security, military and administrative fields,
                                    united by a shared passion for developing the national security system and providing the best security solutions for the Saudi market.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-lg">
                            <p className="text-sm uppercase tracking-[0.35em] text-primary">شركة لجون للأمن والحراسة</p>
                            <p className="text-lg leading-8">
                                شركة سعودية متخصصة في تقديم الحلول الأمنية المتكاملة لجميع القطاعات.
                            </p>
                            <p className="text-lg leading-8">
                                انطلقنا بهدف واضح: بناء منظومة أمنية احترافية تواكب متطلبات رؤية المملكة 2030 وتلبي الاحتياجات المتنامية للسوق السعودي.
                            </p>
                            <p className="text-lg leading-8">
                                نمتلك اليوم حضورًا في جميع مناطق المملكة الثلاث عشرة، ونخدم مئات العملاء في القطاعات الصناعية والتجارية والحكومية.
                            </p>

                            <div className="mt-6 space-y-4 rounded-3xl bg-slate-900/90 p-6">
                                <div>
                                    <h3 className="text-xl font-semibold">الرؤية</h3>
                                    <p className="mt-2 leading-7 text-slate-300">
                                        أن نكون الخيار الأمني الموثوق للمنشآت والقطاعات المختلفة، من خلال تقديم خدمات حراسات أمنية احترافية
                                        ترتكز على الانضباط والجاهزية، وسرعة الاستجابة، بما يسهم في تعزيز السلامة وحماية الأفراد والممتلكات ورفع مستوى ثقة عملائنا.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">الرسالة</h3>
                                    <p className="mt-2 leading-7 text-slate-300">
                                        تقديم حلول أمنية عالية الجودة من خلال كوادر مؤهلة، ومنهجيات تشغيل منضبطة، وإشراف ميداني فعال، بما يضمن استمرارية الأداء،
                                        ورفع كفاءة الحماية، وتقديم تجربة أمنية موثوقة تعكس احترافية عملائنا وتحافظ على سلامة منشآتهم.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">فريق الإدارة</h3>
                                    <p className="mt-2 leading-7 text-slate-300">
                                        يقود لجون فريق من المتخصصين السعوديين ذوي الخبرة الواسعة في المجالات الأمنية والعسكرية والإدارية، يجمعهم شغف مشترك بتطوير منظومة الأمن الوطني وتقديم أفضل الحلول الأمنية للسوق السعودي.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">قيمنا الأساسية</h3>
                                    <ul className="mt-3 space-y-2 leading-7 text-slate-300">
                                        <li>الاحترافية - نلتزم بأعلى معايير الأداء المهني في جميع أعمالنا.</li>
                                        <li>الانضباط - نطبق منهجية تشغيل دقيقة تضمن تنفيذ المهام بكفاءة.</li>
                                        <li>الثقة - نبني علاقاتنا مع عملائنا على المصداقية والالتزام.</li>
                                        <li>الجاهزية - نمتلك فرقاً جاهزة للتعامل مع مختلف الظروف.</li>
                                        <li>المسؤولية - نؤدي مهامنا بحس عالٍ من الالتزام والمسؤولية.</li>
                                        <li>الجودة - نحرص على تقديم خدمات مستقرة وذات جودة عالية.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
