import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/listings -> ilanları getir
export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(listings);
  } catch (err) {
    console.error("GET /api/listings error:", err);
    return NextResponse.json({ error: "İlanlar alınamadı" }, { status: 500 });
  }
}

// POST /api/listings -> ilan oluştur
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const title = String(body?.title ?? "").trim();
    const description = String(body?.description ?? "").trim();

    const pricePerDayRaw = body?.pricePerDay;
    const pricePerDay = Number(pricePerDayRaw);

    const delivery = String(body?.delivery ?? "").trim();
    const city = String(body?.city ?? "").trim();

    if (
      !title ||
      !description ||
      !delivery ||
      !city ||
      !Number.isFinite(pricePerDay) ||
      pricePerDay <= 0
    ) {
      return NextResponse.json(
        { error: "Eksik/yanlış alan var (title/description/city/delivery/pricePerDay)" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        pricePerDay: Math.floor(pricePerDay),
        delivery,
        city,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (err) {
    console.error("POST /api/listings error:", err);
    return NextResponse.json({ error: "İlan oluşturulamadı" }, { status: 500 });
  }
}
