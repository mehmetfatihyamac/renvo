"use client";

import { useState } from "react";

export default function IlanVerPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState<number>(0);
  const [delivery, setDelivery] = useState("Elden");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, pricePerDay, delivery }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Bir hata oldu.");
      }

      // Başarılı: keşfet’e at
      window.location.href = "/kesfet";
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-xl font-extrabold">renvo</a>
        <a
          href="/kesfet"
          className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:border-zinc-500"
        >
          ← Keşfet
        </a>
      </header>

      <section className="mx-auto max-w-3xl px-6">
        <h1 className="text-2xl font-extrabold">İlan Ver</h1>
        <p className="mt-1 text-zinc-300">Eşyanı kiraya ver, kazanmaya başla. Komisyon %20.</p>

        <form
          onSubmit={onSubmit}
          className="mt-6 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6"
        >
          <input
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            placeholder="İlan başlığı (örn. Matkap)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="min-h-[110px] rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            placeholder="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            placeholder="Fiyat (₺ / gün)"
            value={Number.isFinite(pricePerDay) ? pricePerDay : 0}
            onChange={(e) => setPricePerDay(Number(e.target.value))}
            min={0}
          />

          <select
            className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none focus:border-zinc-500"
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
          >
            <option value="Elden">Teslim: Elden</option>
            <option value="Kargo">Teslim: Kargo</option>
            <option value="Elden + Kargo">Teslim: Elden + Kargo</option>
          </select>

          <div className="rounded-xl border border-zinc-800 p-4 text-sm text-zinc-300">
            Depozito otomatik: <b>%20</b>
          </div>

          {error && (
            <div className="rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="rounded-xl bg-white py-3 font-bold text-zinc-950 hover:bg-zinc-200 disabled:opacity-60"
          >
            {loading ? "Yayınlanıyor..." : "İlanı Yayınla"}
          </button>
        </form>
      </section>

      <footer className="mt-10 border-t border-zinc-900 py-8 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} renvo
      </footer>
    </main>
  );
}
