import type { Card as CardType} from "../../types/card";

interface Props {
    card: CardType,
    isDragging?: boolean;
}

export const CardItem = ({card, isDragging}:Props) =>{
    return (
    <div
      className={`bg-white rounded shadow p-3 transition ${
        isDragging ? "shadow-xl rotate-1" : "hover:shadow-md"
      }`}
    >
      <p className="font-medium">{card.title}</p>
      <p className="text-sm text-gray-500">{card.description}</p>
    </div>
  );
}