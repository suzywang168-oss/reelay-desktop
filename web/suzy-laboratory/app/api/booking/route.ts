import { bookingRequests } from "@/db/schema";
import { getDb } from "@/db";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name?: string;
      email?: string;
      preferredDate?: string;
      timezone?: string;
      topic?: string;
      notes?: string;
    };
    const name = body.name?.trim();
    const email = body.email?.trim();
    const preferredDate = body.preferredDate?.trim();
    const timezone = body.timezone?.trim();
    const topic = body.topic?.trim();
    if (!name || !email?.includes("@") || !preferredDate || !timezone || !topic) {
      return Response.json({ error: "invalid" }, { status: 400 });
    }
    const db = await getDb();
    await db.insert(bookingRequests).values({
      name: name.slice(0, 80),
      email: email.slice(0, 160),
      preferredDate: preferredDate.slice(0, 30),
      timezone: timezone.slice(0, 80),
      topic: topic.slice(0, 120),
      notes: (body.notes || "").trim().slice(0, 2000),
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
