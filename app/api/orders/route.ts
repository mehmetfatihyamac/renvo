import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const listingId = String(body?.listingId ?? "").trim();
    const days = Number(body?.days ?? 1);
    const renterEmail = body?.renterEmail
      ? String(body.renterEmail)
      : null;

    if (!listingId) {
      return NextResponse.json(
        { ok: false, error: "listingId yok" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return NextResponse.json(
        { ok: false, error: "İlan bulunamadı" },
        { status: 404 }
      );
    }

    const rentAmount = listing.pricePerDay * days;
    const depositAmount = Math.round(rentAmount * listing.depositRate);
    const totalAmount = rentAmount + depositAmount;

    const order = await prisma.order.create({
      data: {
        listingId,
        days,
        renterEmail,
        rentAmount,
        depositAmount,
        totalAmount,
        status: "PENDING",
      },
    });

    // 🔥 KRİTİK SATIR
    return NextResponse.json({
      ok: true,
      orderId: order.id,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
