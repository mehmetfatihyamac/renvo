export default function OdemeBasarili() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 text-center">
        <div className="text-2xl font-extrabold">Ödeme Başarılı ✅</div>
        <p className="mt-2 text-zinc-300">
          Demo akış: Şimdilik iyzico yerine sahte onay gösteriyoruz.
          Bir sonraki adımda gerçek iyzico entegrasyonuna bağlayacağız.
        </p>
        <a
          href="/kesfet"
          className="mt-5 block w-full rounded-xl bg-white py-3 font-bold text-zinc-950 hover:bg-zinc-200"
        >
          Keşfet’e dön
        </a>
      </div>
    </main>
  );
}
