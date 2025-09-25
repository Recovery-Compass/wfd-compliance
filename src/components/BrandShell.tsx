import React from "react";

export function BrandShell({ children }: {children: React.ReactNode}) {
  return (
    <div className="bg-rc-water" style={{ minHeight: "100vh" }}>
      <div className="bg-rc-mid">
        <header className="w-full">
          <div className="mx-auto maxw-6xl flex items-center justify-between px-4 py-3">
            <img src="/wfd-logo.svg" alt="Whittier First Day" style={{ height: 32 }} />
            <div className="rc-nameplate">RECOVERY COMPASS</div>
          </div>
        </header>
      </div>
      <main className="mx-auto maxw-6xl p-4">{children}</main>
    </div>
  );
}