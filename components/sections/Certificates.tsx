"use client"
import { useLanguage } from '@/context/LanguageProvider';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import React, { useState } from 'react'

const Certificates = () => {
    const { lang, dir, t } = useLanguage();
    const documents = t.certificates.documents;
    const [selectedDocument, setSelectedDocument] = useState<null | { document: string; title: string }>(null);
    const open = selectedDocument !== null;

    console.log('Selected Document:', selectedDocument);

    return (
        <div className='my-8 sm:my-16'>
            <div className='max-w-6xl mx-auto'>
                <div className='text-center'>
                    <p className='text-primary mb-2'>{t.certificates.badge}</p>
                    <div className='space-y-1.5'>
                        <h1 className='font-bold text-2xl'>{t.certificates.title}</h1>
                        <div className='h-1.5 w-16 bg-primary rounded-full mx-auto'></div>
                        <span className='text-xs text-muted-foreground'>{t.certificates.description}</span>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-8'>
                    {documents.map((doc, idx) => (
                        <button
                            key={idx}
                            type='button'
                            onClick={() => setSelectedDocument(doc)}
                            className='group w-full overflow-hidden rounded-xl border border-primary/25 bg-primary/10 p-2 text-left transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70'
                        >
                            <div className='relative h-[180px] overflow-hidden rounded-xl bg-white'>
                                <Image
                                    src={`/certificates/${doc.document}`}
                                    alt={doc.title}
                                    fill
                                    className='object-cover transition duration-300 group-hover:scale-105'
                                />
                            </div>
                            <span className='mt-3 block text-lg text-center font-semibold text-primary'>{doc.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            <Dialog open={open} onOpenChange={(value) => !value && setSelectedDocument(null)}>
                <DialogContent showCloseButton={false} className="w-full h-[90vh] max-w-6xl">
                    <button
                        type='button'
                        onClick={() => setSelectedDocument(null)}
                        className='absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70'
                        aria-label='Close certificate preview'
                    >
                        ×
                    </button>
                    <div className='flex h-full min-h-[320px] w-full flex-col overflow-hidden'>
                        <div className='relative w-full flex-1 overflow-hidden bg-white '>
                            {selectedDocument && (
                                <Image
                                    src={`/certificates/${selectedDocument.document}`}
                                    alt={selectedDocument.title}
                                    fill
                                    className='object-contain '
                                />
                            )}
                        </div>
                        {selectedDocument && (
                            <div className='border-t border-white/10 bg-background/90 p-4 text-center'>
                                <DialogTitle className='text-lg font-semibold font-bold text-primary'>
                                    {selectedDocument.title}
                                </DialogTitle>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Certificates