import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const user = await prisma.user.upsert({
      where: { email: "demo@renvo.ink" },
      update: {},
      create: { email: "demo@renvo.ink", name: "Demo User" },
    });

    await prisma.listing.create({
      data: {
        title: "Matkap",
        description: "Ev işleri için güçlü matkap. Temiz kullanıldı.",
        pricePerDay: 180,
        delivery: "Elden + Kargo",
        city: "Gaziantep",
        ownerId: user.id,
      },
    });

    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
