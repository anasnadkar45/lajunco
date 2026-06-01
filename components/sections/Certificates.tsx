"use client"
import { useLanguage } from '@/context/LanguageProvider';
import Image from 'next/image';
import React from 'react'

const Certificates = () => {
    const { lang, dir, t } = useLanguage();
    const documents = t.certificates.documents;


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

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4'>
                    {documents.map((doc, idx) => (
                        <div key={idx} className='bg-primary/20 border border-primary/25 rounded-md p-3'>
                            <div className='relative h-[180px] overflow-hidden rounded-md bg-white'>
                                <Image
                                    src={`/certificates/${doc.document}`}
                                    alt={doc.title}
                                    fill
                                    className='object-cover'
                                />
                            </div>
                            <span className='mt-2 block text-sm font-medium'>{doc.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Certificates