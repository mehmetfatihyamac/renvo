"use client";

import { useState } from "react";

export default function IlanVerPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState<number>(0);
  const [delivery, setDelivery] = useState("Elden");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit() {
    setMsg(null);

    // min kontrol (backend zaten kontrol ediyor ama kullanıcıyı yormayalım)
    if (!title.trim() || !description.trim() || !city.trim() || !delivery.trim() || pricePerDay <= 0) {
      setMsg("Eksik alan var (Başlık/Açıklama/Şehir/Fiyat/Teslim)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          pricePerDay,
          delivery,
          city,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg(data?.error ?? "İlan oluşturulamadı");
        return;
      }

      setMsg("İlan oluşturuldu ✅");
      setTitle("");
      setDescription("");
      setCity("");
      setPricePerDay(0);
      setDelivery("Elden");
    } catch (e) {
      setMsg("Sunucuya bağlanamadım (fetch hata)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-xl px-6 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight">İlan Ver</h1>
        <p className="mt-2 text-zinc-300">Eşyanı kiraya ver, kazanmaya başla. Komisyon %20.</p>

        <div className="mt-8 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="İlan başlığı (örn. Matkap)"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Açıklama"
            rows={4}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none"
          />

          <input
            value={pricePerDay}
            onChange={(e) => setPricePerDay(Number(e.target.value))}
            type="number"
            min={0}
            placeholder="Günlük fiyat (₺)"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none"
          />

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Şehir (örn. Gaziantep)"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none"
          />

          <select
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none"
          >
            <option value="Elden">Teslim: Elden</option>
            <option value="Kargo">Teslim: Kargo</option>
            <option value="Kurye">Teslim: Kurye</option>
          </select>

          <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-300">
            Depozito otomatik: %20
          </div>

          {msg && (
            <div
              className={`rounded-lg border px-4 py-3 ${
                msg.includes("✅")
                  ? "border-emerald-700 bg-emerald-950/40 text-emerald-200"
                  : "border-red-700 bg-red-950/40 text-red-200"
              }`}
            >
              {msg}
            </div>
          )}

          <button
            disabled={loading}
            onClick={onSubmit}
            className="w-full rounded-lg bg-zinc-50 px-4 py-3 font-semibold text-zinc-950 disabled:opacity-60"
          >
            {loading ? "Gönderiliyor..." : "İlanı Yayınla"}
          </button>
        </div>
      </div>
    </main>
  );
}
