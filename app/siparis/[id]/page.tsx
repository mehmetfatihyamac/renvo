import { prisma } from "../../../lib/prisma";

export default async function SiparisPage(props: any) {
  // ✅ Turbopack/Next bazen params'ı garip getiriyor: sağlam yakala
  const p = await Promise.resolve(props?.params);
  const id = typeof p?.id === "string" ? p.id.trim() : "";

  if (!id) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
        Sipariş ID bulunamadı.
      </main>
    );
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { listing: true },
  });

  if (!order) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
        Sipariş bulunamadı.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
        <h1 className="text-2xl font-extrabold">Sipariş Oluşturuldu ✅</h1>
        <p className="mt-1 text-zinc-300">Durum: {order.status}</p>

        <div className="mt-4 rounded-xl border border-zinc-800 p-4">
          <div className="font-bold">{order.listing.title}</div>
          <div className="text-sm text-zinc-300">
            {order.listing.city} • {order.listing.delivery}
          </div>

          <div className="mt-3 flex justify-between">
            <span>Gün</span>
            <span>{order.days}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span>Kira</span>
            <span>₺{order.rentAmount}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span>Depozito</span>
            <span>₺{order.depositAmount}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-zinc-800 pt-3 font-extrabold">
            <span>Toplam</span>
            <span>₺{order.totalAmount}</span>
          </div>
        </div>

        <a
          href={`/ilan/${order.listingId}`}
          className="mt-4 inline-block rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500"
        >
          İlana dön
        </a>
      </div>
    </main>
  );
}
