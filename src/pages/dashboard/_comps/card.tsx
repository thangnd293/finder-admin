type CardProps = {
  children: React.ReactNode;
};
export default function Card({ children }: CardProps) {
  return (
    <div className="w-full rounded-md shadow-sm border-black/10 border border-solid min-h-[160px] p-4 flex flex-col">
      {children}
    </div>
  );
}
