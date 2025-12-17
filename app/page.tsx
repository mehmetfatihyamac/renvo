export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-extrabold tracking-tight">renvo</div>
        <nav className="flex items-center gap-3 text-sm text-zinc-200">
          <a className="hover:text-white" href="/kesfet">Keşfet</a>
          <a className="hover:text-white" href="/ilan-ver">Eşya Listele</a>
          <a className="rounded-xl border border-zinc-700 px-3 py-2 hover:border-zinc-500" href="/giris">
            Giriş
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8">
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Kirala. Kullan. Geri ver.
            <span className="block text-zinc-300">Gaziantep’te elden veya kargo.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-300">
            renvo ile ihtiyacın olan eşyayı bul, güvenli ödeme ile kirala.
            Depozito %20. Komisyon %20 (kiraya verenden).
          </p>

          <div className="mt-6 grid gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4 md:grid-cols-4">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-zinc-500"
              placeholder="Ne arıyorsun? (matkap, kamera, PS5...)"
            />
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-zinc-500"
              placeholder="Tarih (örn. 20-23 Aralık)"
            />
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none focus:border-zinc-500"
              defaultValue="Gaziantep"
            />
            <a
              className="flex items-center justify-center rounded-xl bg-white px-4 py-3 font-bold text-zinc-950 hover:bg-zinc-200"
              href="/kesfet"
            >
              Ara
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Elektronik", "Ev Aletleri", "Kamp", "Etkinlik", "Oyun", "Diğer"].map((c) => (
              <a
                key={c}
                href="/kesfet"
                className="rounded-full border border-zinc-800 bg-zinc-950/40 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-600 hover:text-white"
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-xl font-bold">Popüler ilanlar</h2>
          <a className="text-sm text-zinc-300 hover:text-white" href="/kesfet">
            Hepsini gör →
          </a>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
              <div className="h-40 rounded-xl bg-zinc-800" />
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="font-semibold">Örnek Ürün #{i}</div>
                <div className="font-extrabold">₺{150 + i * 10}/gün</div>
              </div>
              <div className="mt-1 text-sm text-zinc-300">
                Elden + Kargo • Depozito %20
              </div>
              <a
                href="/ilan/1"
                className="mt-3 inline-flex rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:border-zinc-500"
              >
                İncele
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} renvo • Güvenli ödeme • Depozito koruması
      </footer>
    </main>
  );
}
