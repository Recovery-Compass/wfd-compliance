import React, { useEffect } from "react";

const formatValue = (v: number | string) =>
  typeof v === "number" ? v.toLocaleString("en-US") : v;

function Stat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="min-w-0">
      <div className="text-ink-600">{label}</div>
      <div className="tabular-nums text-ink-900 text-xl">
        {formatValue(value)}
      </div>
    </div>
  );
}

export default function WfdDashboard() {
  useEffect(() => {
    document.title = "Ted's Place - July 2025";
  }, []);

  const data = {
    intake: 36,
    services: { meals: 1880, wellness: 744, laundry: 140 },
    exits: { housed: 1, successful: 1, uha: 1 },
  };

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
            <Stat label="Unduplicated" value={data.intake} />
          </article>

          <article className="bg-card border border-line rounded-lg shadow-enterprise p-4 md:p-6">
            <h2 className="text-h3-card text-ink-700 mb-3">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Stat label="Meals" value={data.services.meals} />
              <Stat label="Wellness Checks" value={data.services.wellness} />
              <Stat label="Laundry Services" value={data.services.laundry} />
            </div>
          </article>

          <article className="bg-card border border-line rounded-lg shadow-enterprise p-4 md:p-6">
            <h2 className="text-h3-card text-ink-700 mb-3">Exits</h2>
            <div className="grid grid-cols-3 gap-4">
              <Stat label="Housed" value={data.exits.housed} />
              <Stat label="Successful" value={data.exits.successful} />
              <Stat label="UHA Certified" value={data.exits.uha} />
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
