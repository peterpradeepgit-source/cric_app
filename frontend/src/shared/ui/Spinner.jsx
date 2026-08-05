export default function Spinner() {
  return (
    <div className="flex justify-center py-16" role="status" aria-label="Loading">
      <div className="w-8 h-8 border-2 border-cblive/30 border-t-cblive rounded-full animate-spin" />
    </div>
  );
}
