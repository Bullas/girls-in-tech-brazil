import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/criadoras/', label: 'Conhecer criadoras' },
  { href: '/sobre/', label: 'Sobre o projeto' },
  { href: '/contribuir/', label: 'Como contribuir' },
]

export function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border-soft)] text-[var(--color-text-inverse)]"
      style={{ background: 'linear-gradient(160deg, #0f0723 60%, #2e1065 100%)' }}
    >
      <div className="page-shell grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-9 items-center justify-center rounded-xl text-base font-black text-white"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #f43f5e)' }}
            >
              GT
            </span>
            <p
              className="text-sm font-black uppercase tracking-[0.18em]"
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #fb7185)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Comunidade aberta · Open source
            </p>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Girls in Tech Brazil</h2>
          <p className="max-w-2xl leading-7 text-white/72">
            Uma vitrine curada para reconhecer, compartilhar e tornar mais encontráveis mulheres
            brasileiras que constroem e ensinam tecnologia.
          </p>
        </div>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10 hover:border-white/40"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Bullas/girls-in-tech-brazil"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:border-white/40 hover:bg-white/10"
          >
            Repositório GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}
