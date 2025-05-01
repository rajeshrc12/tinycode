import AIAgent from "@/components/nodes/ai-agent";
import Telegram from "@/components/nodes/telegram";
import Gemini from "@/components/nodes/gemini";
import Gmail from "@/components/nodes/gmail";
import SwitchRule from "@/components/nodes/switch-rule";
import { Node } from "@xyflow/react";

export const nodeTypes = {
  telegram: Telegram,
  "ai-agent": AIAgent,
  gemini: Gemini,
  gmail: Gmail,
  "switch-rule": SwitchRule,
};
export const initialNodes: Node[] = [
  {
    id: "telegram",
    position: { x: 100, y: 100 },
    data: { label: "telegram" },
    type: "telegram",
  },
  {
    id: "gmail",
    position: { x: 500, y: 100 },
    data: { label: "gmail" },
    type: "gmail",
  },
  {
    id: "switch-rule",
    position: { x: 300, y: 100 },
    data: { label: "switch-rule" },
    type: "switch-rule",
  },
];
