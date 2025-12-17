import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/listings
export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ ok: true, listings });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Listeler alınamadı" },
      { status: 500 }
    );
  }
}

// POST /api/listings
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, description, pricePerDay, delivery, city } = body;

    if (!title || !description || !pricePerDay) {
      return NextResponse.json(
        { ok: false, error: "Eksik alan" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        pricePerDay: Number(pricePerDay),
        depositRate: 0.2,
        delivery: delivery || "Elden",
        city: city || "Gaziantep",
        ownerId: "demo-user",
      },
    });

    return NextResponse.json({ ok: true, listing });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "İlan oluşturulamadı" },
      { status: 500 }
    );
  }
}
