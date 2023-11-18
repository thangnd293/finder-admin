type TitleProps = {
  children: React.ReactNode;
};
export default function Title({ children }: TitleProps) {
  return <p className="text-start text-3xl font-bold">{children}</p>;
}
