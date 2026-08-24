import { useEffect, useMemo, useRef, useState } from "react";
import { loadProjects, saveProjects } from "./storage";
import type { CanvasNode, NodeKind, PainterProject } from "./types";

function makeNode(kind: NodeKind, index: number): CanvasNode {
  const labels: Record<NodeKind, [string, string]> = {
    prompt: ["提示词", "写下主体、镜头、光线与画面风格……"],
    image: ["参考图", "上传参考图功能将在素材服务接入后启用"],
    note: ["创作笔记", "记录角色、场景或分镜要求……"],
  };
  return {
    id: crypto.randomUUID(),
    kind,
    title: labels[kind][0],
    content: labels[kind][1],
    x: 140 + (index % 3) * 340,
    y: 140 + Math.floor(index / 3) * 240,
    width: 300,
  };
}

export function App() {
  const [projects, setProjects] = useState<PainterProject[]>(loadProjects);
  const [activeId, setActiveId] = useState(projects[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const dragging = useRef<{ id: string; dx: number; dy: number } | null>(null);

  const project = useMemo(
    () => projects.find((item) => item.id === activeId) ?? projects[0],
    [activeId, projects],
  );

  useEffect(() => saveProjects(projects), [projects]);

  function updateProject(updater: (value: PainterProject) => PainterProject) {
    setProjects((current) =>
      current.map((item) =>
        item.id === activeId
          ? { ...updater(item), updatedAt: new Date().toISOString() }
          : item,
      ),
    );
  }

  function addNode(kind: NodeKind) {
    updateProject((value) => ({ ...value, nodes: [...value.nodes, makeNode(kind, value.nodes.length)] }));
  }

  function beginDrag(event: React.PointerEvent, node: CanvasNode) {
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    dragging.current = { id: node.id, dx: event.clientX / zoom - node.x, dy: event.clientY / zoom - node.y };
    setSelectedId(node.id);
  }

  function moveNode(event: React.PointerEvent) {
    if (!dragging.current) return;
    const { id, dx, dy } = dragging.current;
    updateProject((value) => ({
      ...value,
      nodes: value.nodes.map((node) =>
        node.id === id
          ? { ...node, x: event.clientX / zoom - dx, y: event.clientY / zoom - dy }
          : node,
      ),
    }));
  }

  function editNode(id: string, content: string) {
    updateProject((value) => ({
      ...value,
      nodes: value.nodes.map((node) => (node.id === id ? { ...node, content } : node)),
    }));
  }

  function removeSelected() {
    if (!selectedId) return;
    updateProject((value) => ({ ...value, nodes: value.nodes.filter((node) => node.id !== selectedId) }));
    setSelectedId(null);
  }

  function createProject() {
    const next: PainterProject = {
      id: crypto.randomUUID(),
      name: `未命名项目 ${projects.length + 1}`,
      updatedAt: new Date().toISOString(),
      nodes: [],
    };
    setProjects((current) => [...current, next]);
    setActiveId(next.id);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><span>P</span><strong>Painter</strong></div>
        <input
          className="project-name"
          value={project.name}
          aria-label="项目名称"
          onChange={(event) => updateProject((value) => ({ ...value, name: event.target.value }))}
        />
        <div className="status"><i /> 已自动保存</div>
        <button className="share-button">分享</button>
      </header>

      <aside className="sidebar">
        <button className="new-project" onClick={createProject}>＋ 新建项目</button>
        <p className="eyebrow">项目</p>
        <nav>
          {projects.map((item) => (
            <button
              key={item.id}
              className={item.id === activeId ? "project active" : "project"}
              onClick={() => setActiveId(item.id)}
            >
              <span>{item.name}</span><small>{item.nodes.length} 个节点</small>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button>资产库</button><button>版本记录</button><button>设置</button>
        </div>
      </aside>

      <section className="workspace">
        <div className="toolbar">
          <button onClick={() => addNode("prompt")}>＋ 提示词</button>
          <button onClick={() => addNode("image")}>＋ 参考图</button>
          <button onClick={() => addNode("note")}>＋ 笔记</button>
          <span />
          <button disabled={!selectedId} onClick={removeSelected}>删除</button>
        </div>
        <div
          className="canvas"
          onPointerMove={moveNode}
          onPointerUp={() => { dragging.current = null; }}
          onPointerCancel={() => { dragging.current = null; }}
          onClick={(event) => { if (event.target === event.currentTarget) setSelectedId(null); }}
        >
          <div className="canvas-world" style={{ transform: `scale(${zoom})` }}>
            {project.nodes.map((node) => (
              <article
                key={node.id}
                className={`node node-${node.kind} ${selectedId === node.id ? "selected" : ""}`}
                style={{ left: node.x, top: node.y, width: node.width }}
                onPointerDown={(event) => beginDrag(event, node)}
              >
                <header><span>{node.kind === "prompt" ? "✦" : node.kind === "image" ? "▧" : "≡"}</span>{node.title}<b>•••</b></header>
                <textarea
                  value={node.content}
                  aria-label={`${node.title}内容`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onChange={(event) => editNode(node.id, event.target.value)}
                />
                <footer>{node.kind === "prompt" ? <button>生成图片</button> : <small>自动保存</small>}</footer>
              </article>
            ))}
          </div>
          {project.nodes.length === 0 && <div className="empty">从一个提示词、参考图或笔记开始</div>}
        </div>
        <div className="zoom-control">
          <button onClick={() => setZoom((value) => Math.max(.5, value - .1))}>−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((value) => Math.min(1.8, value + .1))}>＋</button>
        </div>
      </section>
    </main>
  );
}
