import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllCreators } from '@/lib/creators'
import { DiscoveryExperience } from '@/components'

export const metadata: Metadata = {
  title: {
    absolute: 'Criadoras · Girls in Tech Brazil',
  },
  description:
    'Descubra mulheres referências em tecnologia no Brasil. Busque por área, tipo de conteúdo e muito mais.',
  openGraph: {
    title: 'Descubra criadoras brasileiras de tecnologia',
    description: 'Vitrine curada de mulheres técnicas da comunidade brasileira de tecnologia.',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/criadoras/',
  },
}

function DiscoveryFallback() {
  return (
    <section className="panel space-y-5 p-5 sm:p-6">
      <div className="h-12 rounded-[1.25rem] bg-[var(--color-surface-muted)]" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-10 w-28 rounded-full bg-[var(--color-surface-muted)]" />
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="panel min-h-64 animate-pulse bg-white/70 p-5" />
        ))}
      </div>
    </section>
  )
}

export default async function CriadorasPage() {
  const creators = await getAllCreators()

  return (
    <div className="page-shell section-gap space-y-8">
      <section className="space-y-4">
        <p className="eyebrow text-[var(--color-brand-700)]">Descoberta</p>
        <h1 className="text-4xl font-black tracking-tight">
          Encontre as criadoras de conteúdos por tema e formato
        </h1>
        <p className="max-w-3xl leading-7 text-[var(--color-text-muted)]">
          Use a busca, combine categorias e navegue por páginas sem perder o estado da URL.
        </p>
      </section>

      <Suspense fallback={<DiscoveryFallback />}>
        <DiscoveryExperience creators={creators} />
      </Suspense>
    </div>
  )
}
