const WORKSPACE_ID = "default-workspace";

async function getDatabase() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) throw new Error("D1 数据库暂不可用");
  return env.DB;
}

export async function GET() {
  try {
    const database = await getDatabase();
    const row = await database.prepare(
      "SELECT id, project_name AS projectName, active_canvas_id AS activeCanvasId, payload, revision, updated_at AS updatedAt FROM reelay_workspaces WHERE id = ?"
    ).bind(WORKSPACE_ID).first();

    if (!row) {
      return Response.json({ workspace: null });
    }

    return Response.json({
      workspace: {
        ...row,
        payload: JSON.parse(String(row.payload)),
      },
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "读取工作区失败" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as {
      projectName?: string;
      activeCanvasId?: string;
      payload?: unknown;
    };

    if (!body.projectName || !body.activeCanvasId || !body.payload) {
      return Response.json({ error: "工作区数据不完整" }, { status: 400 });
    }

    const database = await getDatabase();
    await database.prepare(
      `INSERT INTO reelay_workspaces (id, project_name, active_canvas_id, payload, revision, updated_at)
       VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
       ON CONFLICT(id) DO UPDATE SET
         project_name = excluded.project_name,
         active_canvas_id = excluded.active_canvas_id,
         payload = excluded.payload,
         revision = reelay_workspaces.revision + 1,
         updated_at = CURRENT_TIMESTAMP`
    ).bind(
      WORKSPACE_ID,
      body.projectName,
      body.activeCanvasId,
      JSON.stringify(body.payload)
    ).run();

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "保存工作区失败" },
      { status: 500 }
    );
  }
}
