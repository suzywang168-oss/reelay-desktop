import { contactMessages } from "@/db/schema";
import { getDb } from "@/db";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { name?: string; email?: string; message?: string; language?: string };
    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    if (!name || !email || !message || !email.includes("@")) {
      return Response.json({ error: "invalid" }, { status: 400 });
    }
    const db = await getDb();
    await db.insert(contactMessages).values({
      name: name.slice(0, 80),
      email: email.slice(0, 160),
      message: message.slice(0, 2000),
      language: (body.language || "zh").slice(0, 8),
      createdAt: new Date().toISOString(),
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
