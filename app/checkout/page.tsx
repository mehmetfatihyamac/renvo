"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [item, setItem] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [days, setDays] = useState(1);

  useEffect(() => {
    const raw = sessionStorage.getItem("checkout_item");
    if (!raw) {
      setErr("Checkout verisi yok. İlândan gel.");
      return;
    }

    const parsed = JSON.parse(raw);
    setItem(parsed);

    const url = new URL(window.location.href);
    const d = Number(url.searchParams.get("days") || 1);
    setDays(Math.max(1, Math.min(30, d)));
  }, []);

  if (err) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
        {err}
      </main>
    );
  }

  if (!item) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        Yükleniyor...
      </main>
    );
  }

  const rent = item.pricePerDay * days;
  const deposit = Math.round(rent * 0.2);
  const total = rent + deposit;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <h1 className="text-2xl font-bold">Ödeme</h1>

      <div className="mt-4 border border-zinc-800 rounded-xl p-4">
        <div className="font-semibold">{item.title}</div>
        <div className="text-zinc-300 text-sm">
          {item.city} • {item.delivery}
        </div>

        <div className="mt-4">Gün: {days}</div>
        <div>Kira: ₺{rent}</div>
        <div>Depozito (%20): ₺{deposit}</div>
        <div className="font-bold mt-2">Toplam: ₺{total}</div>

        <button
          className="mt-6 w-full bg-white text-black py-3 rounded-xl font-bold"
          onClick={async () => {
            try {
              const r = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  listingId: item.id,
                  days,
                  renterEmail: "demo@kiraci.com",
                }),
              });

              const data = await r.json();
              if (!r.ok) throw new Error(data?.error || "Order oluşturulamadı");

              window.location.href = `/siparis/${data.orderId}`;
            } catch (e: any) {
              alert(String(e?.message ?? e));
            }
          }}
        >
          Ödemeye geç (Order oluştur)
        </button>
      </div>
    </main>
  );
}
