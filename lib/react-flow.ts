import AIAgent from "@/components/nodes/ai-agent";
import Chat from "@/components/nodes/chat";
import Gemini from "@/components/nodes/gemini";
import { Node } from "@xyflow/react";

export const nodeTypes = {
  chat: Chat,
  "ai-agent": AIAgent,
  gemini: Gemini,
};
export const initialNodes: Node[] = [
  {
    id: "chat",
    position: { x: 100, y: 100 },
    data: { label: "1" },
    type: "chat",
  },
  {
    id: "ai-agent",
    position: { x: 100, y: 300 },
    data: { label: "2" },
    type: "ai-agent",
  },
  {
    id: "gemini-chat-model",
    position: { x: 100, y: 500 },
    data: { label: "3" },
    type: "gemini",
  },
];
