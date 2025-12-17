import { prisma } from "@/lib/prisma";
import IlanDetayClient from "./ilan-client";

export default async function Page(props: any) {
  const p = await Promise.resolve(props?.params);
  const id = typeof p?.id === "string" ? p.id.trim() : "";

  if (!id) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
        Link hatalı: ilan id yok.
      </main>
    );
  }

  const item = await prisma.listing.findUnique({
    where: { id },
  });

  if (!item) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
        İlan bulunamadı.
      </main>
    );
  }

  return <IlanDetayClient item={item} />;
}
