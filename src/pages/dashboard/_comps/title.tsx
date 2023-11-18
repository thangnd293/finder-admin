type TitleProps = {
  children: React.ReactNode;
};
export default function Title({ children }: TitleProps) {
  return <p className="text-start text-2xl font-bold">{children}</p>;
}
