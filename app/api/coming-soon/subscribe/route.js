import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { phone, collection } = await request.json();
    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "phone required" }, { status: 400 });
    }
    console.log("[coming-soon] new subscriber", { phone, collection });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
