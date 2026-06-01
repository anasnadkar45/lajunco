"use client"

import Image from 'next/image'
import React from 'react'
import { useLanguage } from '@/context/LanguageProvider'

const About = () => {
  const { dir, t } = useLanguage()
  const about = t.about
  const isRtl = dir === 'rtl'

  return (
    <section id='about' className='py-12 sm:py-16 bg-gray-100'>
      <div className={`mx-auto grid max-w-6xl gap-10 items-center lg:grid-cols-[0.9fr_1.1fr]`}>
        <div className={`space-y-6 text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
          <p className='text-primary font-semibold'>{about.badge}</p>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              {about.title}
            </h2>
            <div className='mx-auto h-1 w-16 rounded-full bg-primary lg:mx-0'></div>
          </div>

          <div className='space-y-4 text-sm leading-7 text-muted-foreground'>
            {about.description.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-100 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] ${!isRtl ? 'lg:order-first' : ''}`}>
          <div className='absolute inset-0 bg-gradient-to-t from-secondary/80 via-slate-950/0 to-secondary/60 backdrop-blur-[1px]' />

          <Image
            src='/logo.png'
            alt='Lajun logo'
            width={300}
            height={300}
            className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'
          />
          <Image
            src={`/images/${about.image}`}
            alt={about.title}
            width={1200}
            height={900}
            className='h-full w-full object-cover'
          />
        </div>
      </div>
    </section>
  )
}

export default About