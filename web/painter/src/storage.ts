import type { PainterProject } from "./types";

const STORAGE_KEY = "painter.projects.v1";

const starterProject: PainterProject = {
  id: "first-project",
  name: "第一个创作项目",
  updatedAt: new Date().toISOString(),
  nodes: [
    {
      id: "welcome",
      kind: "prompt",
      title: "创作起点",
      content: "描述你想生成的画面，然后继续添加参考图或笔记节点。",
      x: 120,
      y: 120,
      width: 300,
    },
  ],
};

export function loadProjects(): PainterProject[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as PainterProject[]) : [starterProject];
  } catch {
    return [starterProject];
  }
}

export function saveProjects(projects: PainterProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}
