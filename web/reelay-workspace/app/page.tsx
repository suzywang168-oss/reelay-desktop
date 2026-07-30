"use client";

export default function Home() {
  return (
    <main className="reelay-shell">
      <iframe
        className="reelay-frame"
        src="/reelay.html"
        title="Reelay 工作台"
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </main>
  );
}
