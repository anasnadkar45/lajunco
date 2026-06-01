"use client"

import Image from 'next/image'
import React from 'react'
import { useLanguage } from '@/context/LanguageProvider'
import { Button } from '../ui/button'

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

        <div className='mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {service.cards.map((card, index) => (
            <div
              key={index}
              className='group overflow-hidden rounded-3xl border border-white/10 bg-white text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:shadow-2xl'
            >
              <div className='relative h-64 overflow-hidden'>
                <Image
                  src={`/images/${card.image}`}
                  alt={card.title}
                  fill
                  className='object-cover transition duration-500 group-hover:scale-105'
                />
              </div>
              <div className='flex flex-col gap-4 p-6'>
                <div className='flex items-center justify-between gap-3'>
                  <h3 className='text-lg font-semibold'>{card.title}</h3>
                  <span className='inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-full bg-primary text-sm font-semibold text-white shimmer'>
                    {index + 1}
                  </span>
                </div>
                <p className='text-sm leading-7 text-slate-600'>{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 flex justify-center'>
          <Button variant={'default'} size={'lg'} className="font-semibold text-white">
            {service.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Service