import React, { useEffect } from 'react'

const Stat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col gap-1">
    <span className="text-label text-ink-700 uppercase tracking-wide">{label}</span>
    <span className="text-data-large tabular-nums text-ink-900">{value}</span>
  </div>
)

export default function WfdDashboard() {
  useEffect(() => {
    document.title = "Ted's Place - July 2025"
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto max-w-dashboard px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <img src="/wfd-logo.svg" alt="WFD sun and house logo" className="h-10 w-auto" />
          <h1 className="text-h1-page font-poppins text-ink-900 text-center">Ted's Place — July 2025</h1>
          <img src="/rc-logo.svg" alt="Recovery Compass mark" className="h-7 w-auto opacity-80" />
        </div>
      </header>

      <main className="container mx-auto max-w-dashboard px-4 md:px-6 pb-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <article className="bg-card border border-line rounded-lg shadow-enterprise p-4 md:p-6">
            <h2 className="text-h3-card text-ink-700 mb-3">Clients Served</h2>
            <Stat label="Unduplicated" value={36} />
          </article>

          <article className="bg-card border border-line rounded-lg shadow-enterprise p-4 md:p-6">
            <h2 className="text-h3-card text-ink-700 mb-3">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Stat label="Meals" value={"1,880"} />
              <Stat label="Wellness Checks" value={744} />
              <Stat label="Laundry" value={140} />
            </div>
          </article>

          <article className="bg-card border border-line rounded-lg shadow-enterprise p-4 md:p-6">
            <h2 className="text-h3-card text-ink-700 mb-3">Exits</h2>
            <div className="grid grid-cols-3 gap-4">
              <Stat label="Housed" value={1} />
              <Stat label="Successful" value={1} />
              <Stat label="UHA Certified" value={1} />
            </div>
          </article>
        </section>

        <section className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8">
          <a
            href="/MOU_WFD_2025-08-11.pdf"
            download
            className="inline-flex items-center justify-center min-h-11 px-4 rounded-md bg-wfd-gold text-accent-foreground hover:opacity-90 transition-[opacity]"
            aria-label="Download Memorandum of Understanding"
          >
            Download MOU (PDF)
          </a>
          <p className="text-sm text-ink-600">Data current as of July 31, 2025</p>
        </section>
      </main>
    </div>
  )
}
