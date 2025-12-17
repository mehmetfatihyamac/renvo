import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
  });

  if (!listing) {
    return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  }

  return Response.json({ ok: true, listing });
}
