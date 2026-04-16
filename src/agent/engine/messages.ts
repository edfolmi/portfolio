import type { AgentMessage, MessageBlock } from "../types";

let seq = 0;
export function nextId(): string {
  seq += 1;
  return `m_${Date.now()}_${seq}`;
}

export function systemMessage(
  blocks: MessageBlock[],
  kind: AgentMessage["kind"] = "body",
): AgentMessage {
  return {
    id: nextId(),
    role: "system",
    kind,
    blocks,
    createdAt: Date.now(),
  };
}

export function userMessage(text: string): AgentMessage {
  return {
    id: nextId(),
    role: "user",
    blocks: [{ type: "text", text }],
    createdAt: Date.now(),
  };
}

export function textBlock(text: string): MessageBlock {
  return { type: "text", text };
}

export function slotGridBlock(day: string, ranges: string[]): MessageBlock {
  return { type: "slot_grid", day, ranges };
}
