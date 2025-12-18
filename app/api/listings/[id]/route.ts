export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, ctx: any) {
  try {
    const p = await Promise.resolve(ctx?.params);
    const id = typeof p?.id === "string" ? p.id.trim() : "";

    if (!id) {
      return NextResponse.json({ ok: false, error: "id yok" }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      return NextResponse.json(
        { ok: false, error: "İlan bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, listing });
  } catch (e: any) {
    console.error("LISTING_ID_ROUTE_ERROR:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
