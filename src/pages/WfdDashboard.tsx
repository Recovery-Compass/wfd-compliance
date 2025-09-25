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
    <div className="min-w-0 space-y-1">
      <div className="text-caption text-muted-foreground">{label}</div>
      <div className="text-kpi-value text-foreground">
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
    <main className="min-h-screen bg-background">
      {/* Header - Steve Jobs clean layout */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <img 
src="/whittier-first-day-logo.png"
              alt="Whittier First Day" 
              className="h-12 w-auto" 
            />
            <h1 className="text-hero text-center flex-1 mx-8">
              Ted&apos;s Place — July 2025
            </h1>
            <img 
src="/recovery-compass-logo.png"
              alt="Recovery Compass" 
              className="h-9 w-auto opacity-70" 
            />
          </div>
        </div>
      </header>

      {/* Main Content - Generous spacing */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Intake Card */}
          <article className="card-minimal">
            <h2 className="text-headline mb-8">Client Intake</h2>
            <Stat label="Unduplicated Individuals" value={data.intake} />
          </article>

          {/* Services Card */}
          <article className="card-minimal">
            <h2 className="text-headline mb-8">Services Provided</h2>
            <div className="space-y-8">
              <Stat label="Meals Served" value={data.services.meals} />
              <Stat label="Wellness Checks" value={data.services.wellness} />
              <Stat label="Laundry Services" value={data.services.laundry} />
            </div>
          </article>

          {/* Exits Card */}
          <article className="card-minimal">
            <h2 className="text-headline mb-8">Successful Outcomes</h2>
            <div className="space-y-8">
              <Stat label="Housed" value={data.exits.housed} />
              <Stat label="Successful Completion" value={data.exits.successful} />
              <Stat label="UHA Certified" value={data.exits.uha} />
            </div>
          </article>
        </div>

        {/* Footer - Minimal and clean */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <a
              href="/MOU_WFD_2025-08-11.pdf"
              download
              className="inline-flex items-center justify-center h-12 px-8 bg-primary text-primary-foreground rounded-xl text-body font-medium hover:bg-primary-light transition-colors"
            >
              Download MOU
            </a>
            <p className="text-caption text-muted-foreground">
              Data current as of July 31, 2025
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}