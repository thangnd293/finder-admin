import Card from "./card";
import Title from "./title";

type CardProps = {
  title: string;
};
export default function CardInfo({ title }: CardProps) {
  return (
    <Card>
      <div className="grow">
        <Title>{title}</Title>
      </div>

      <div className="flex justify-between items-end">
        <span className="text-4xl">100</span>
        <span className="font-medium">10%</span>
      </div>
    </Card>
  );
}
