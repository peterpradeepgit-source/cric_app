export default function LastUpdatedLabel({ activeTab, lastUpdated }) {
  if (!lastUpdated) return null;

  return (
    <p className="text-xs text-gray-600 mb-4">
      Updated{" "}
      {lastUpdated.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
      {activeTab === "live" && " · auto-refreshing"}
    </p>
  );
}
