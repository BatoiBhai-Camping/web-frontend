export default function Section({ title, children }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}