import { AgentOverlay } from "./ui/AgentOverlay";
import { AgentTrigger } from "./ui/AgentTrigger";

/**
 * Portfolio AI system interface: edge trigger + full-screen consult overlay.
 * Conversation and session logic live in ./state/agentStore (WebSocket-ready snapshot: getTransportSnapshot).
 */
export function PortfolioAgent() {
  return (
    <>
      <AgentTrigger />
      <AgentOverlay />
    </>
  );
}
