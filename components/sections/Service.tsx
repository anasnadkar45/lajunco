"use client"

import Image from 'next/image'
import React from 'react'
import { useLanguage } from '@/context/LanguageProvider'
import { Button } from '../ui/button'
import Link from 'next/link'

const Service = () => {
  const { dir, t } = useLanguage()
  const service = t.service
  const isRtl = dir === 'rtl'

  return (
    <section id='services' className='bg-secondary py-16 text-white'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {service.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <p className='text-3xl font-bold text-primary'>{stat.value}</p>
              <p className='mt-3 text-sm font-semibold'>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <p className='text-primary text-sm font-semibold uppercase tracking-[0.2em]'>{service.badge}</p>
          <h2 className='mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
            {service.title}
          </h2>
          <div className='mx-auto mt-4 h-1 w-16 rounded-full bg-primary'></div>
        </div>

        <div className='mt-12 grid gap-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3'>
          {service.cards.map((card, index) => (
            <Link
              key={index}
              className='relative p-1.5 group rounded-3xl border border-white/10 bg-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:shadow-2xl'
              href={card.link}
            >
              <div className='relative h-64 overflow-hidden rounded-2xl'>
                <Image
                  src={`/images/${card.image}`}
                  alt={card.title}
                  fill
                  className='object-cover transition duration-500 group-hover:scale-105'
                />
              </div>
              <div className='flex flex-col gap-2 text-center px-4'>
                <h3 className='text-lg font-bold text-secondary'>{card.title}</h3>
                <p className='text-sm text-primary'>{card.description}</p>
              </div>
              <span className='absolute left-1/2 -bottom-6 z-10 h-10 w-10 -translate-x-1/2 flex items-center justify-center rounded-full bg-primary text-sm font-bold text-white shimmer'>
                {index + 1}
              </span>
            </Link>
          ))}
        </div>

        {/* <div className='mt-12 flex justify-center'>
          <Button variant={'default'} size={'lg'} className="font-semibold text-white">
            {service.cta}
          </Button>
        </div> */}
      </div>
    </section>
  )
}

export default Service