import { getStatusColor } from "../../../../utils";

export default function MatchStatusDot({ status }) {
  const pulseClass = status === "live" ? "animate-pulse" : "";

  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${getStatusColor(status)} ${pulseClass}`}
    />
  );
}
