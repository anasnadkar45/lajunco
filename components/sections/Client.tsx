"use client"

import React from 'react'
import { useLanguage } from '@/context/LanguageProvider'

const Client = () => {
  const { dir, t } = useLanguage()
  const clients = t.clients
  const isRtl = dir === 'rtl'

  return (
    <section id='clients' className='bg-white py-16 text-slate-950'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='text-center'>
          <p className='text-primary text-sm font-semibold uppercase tracking-[0.3em]'>
            {clients.badge}
          </p>
          <h2 className='mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
            {clients.title}
          </h2>
          <div className='mx-auto mt-4 h-1 w-16 rounded-full bg-primary'></div>
        </div>

        <div className='mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-6'>
          {clients.items.map((client, index) => {
            const initials = client.name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((word) => word[0])
              .join('')

            return (
              <div
                key={index}
                className='group rounded-3xl border border-slate-200/70 bg-slate-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
              >
                <div className='mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-xl font-semibold text-slate-700'>
                  {initials}
                </div>
                <p className='text-sm font-semibold text-slate-900'>{client.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Client