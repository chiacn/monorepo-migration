interface CommonLineDividerProps {
  title?: string;
  children: React.ReactNode;
}
export default function CommonLineDivider({
  title,
  children,
}: CommonLineDividerProps) {
  return (
    <div className="w-[80%]">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="border-b border-gray-500 p-4">{children}</div>
    </div>
  );
}
