export type NodeKind = "prompt" | "image" | "note";

export interface CanvasNode {
  id: string;
  kind: NodeKind;
  title: string;
  content: string;
  x: number;
  y: number;
  width: number;
}

export interface PainterProject {
  id: string;
  name: string;
  updatedAt: string;
  nodes: CanvasNode[];
}
