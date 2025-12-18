import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: false,
    error: "Seed devre dışı (User modeli yok).",
  });
}
