"use client";

export default function IlanDetayClient({ item }: { item: any }) {
  const rent = Number(item?.pricePerDay ?? 0);
  const deposit = Math.round(rent * 0.2);
  const total = rent + deposit;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <h1 className="text-3xl font-bold">{item?.title ?? "İlan"}</h1>

      <p className="mt-1 text-zinc-300">
        {item?.city ?? ""} • {item?.delivery ?? ""}
      </p>

      <div className="mt-4 space-y-1">
        <div>Günlük fiyat: ₺{rent}</div>
        <div>Depozito (%20): ₺{deposit}</div>
        <div className="font-bold">Toplam: ₺{total}</div>
      </div>

      <button
        className="mt-6 w-full rounded-xl bg-white py-3 font-bold text-zinc-950"
        onClick={() => {
          sessionStorage.setItem(
            "checkout_item",
            JSON.stringify({
              id: item.id,
              title: item.title,
              pricePerDay: item.pricePerDay,
              city: item.city,
              delivery: item.delivery,
            })
          );
          window.location.href = "/checkout";
        }}
      >
        Öde ve Kirala
      </button>
    </main>
  );
}
