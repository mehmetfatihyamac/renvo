export const dynamic = "force-dynamic";
export const revalidate = 0;

import { prisma } from "@/lib/prisma";

export default async function KesfetPage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* HEADER */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="/" className="text-xl font-extrabold tracking-tight">
          renvo
        </a>
        <nav className="flex items-center gap-3 text-sm text-zinc-200">
          <a className="hover:text-white" href="/ilan-ver">
            Eşya Listele
          </a>
        </nav>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-6">
        <h1 className="text-2xl font-extrabold">Keşfet</h1>
        <p className="mt-1 text-zinc-300">
          Türkiye genelinde kiralanabilir eşyalar
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {listings.map((x) => (
            <a
              key={x.id}
              href={`/ilan/${x.id}`}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4 transition hover:border-zinc-600"
            >
              {/* Foto placeholder */}
              <div className="h-40 rounded-xl bg-zinc-800" />

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="font-semibold">{x.title}</div>
                <div className="font-extrabold">₺{x.pricePerDay}/gün</div>
              </div>

              <div className="mt-1 text-sm text-zinc-300">
                {x.city} • {x.delivery} • Depozito %20
              </div>
            </a>
          ))}

          {listings.length === 0 && (
            <div className="text-zinc-400">Henüz ilan yok.</div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-zinc-900 py-8 text-center text-sm text-zinc-400">
        © {new Date().getFullYear()} renvo
      </footer>
    </main>
  );
}
