import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { listingId, days, renterEmail } = body

    if (!listingId || !days || !renterEmail) {
      return NextResponse.json(
        { ok: false, error: "Eksik alan var" },
        { status: 400 }
      )
    }

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    })

    if (!listing) {
      return NextResponse.json(
        { ok: false, error: "İlan bulunamadı" },
        { status: 404 }
      )
    }

    const DEPOSIT_RATE = 0.2
    const rentAmount = listing.pricePerDay * days
    const depositAmount = Math.round(rentAmount * DEPOSIT_RATE)
    const totalAmount = rentAmount + depositAmount

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
    })

    return NextResponse.json({ ok: true, order })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { ok: false, error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}
