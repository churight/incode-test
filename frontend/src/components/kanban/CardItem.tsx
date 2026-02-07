import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { deleteCard } from "../../features/cards/cardsAPI";
import AddCardForm from "./AddCardForm";
import type { Card as CardType } from "../../types/card";

interface Props {
  card: CardType;
  isDragging?: boolean;
}

export const CardItem = ({ card, isDragging }: Props) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      await dispatch(deleteCard(card._id));
    }
  };

  if (isEditing) {
    return (
      <AddCardForm
        columnId={card.columnId}
        mode="edit"
        initialData={card}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div
      className={`group bg-white rounded-lg border border-gray-200 p-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md ${
        isDragging
          ? "shadow-2xl rotate-2 ring-2 ring-blue-400 opacity-90"
          : "shadow-sm hover:border-gray-300"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="space-y-2">
        <p className="font-medium text-gray-900 text-sm leading-snug">
          {card.title}
        </p>

        {card.description && (
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
            {card.description}
          </p>
        )}

        {/* Action Buttons */}
        <div
          className={`flex gap-2 pt-2 border-t border-gray-100 transition-opacity duration-200 ${
            showActions ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="flex-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-1.5 px-2 rounded transition-colors duration-150"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="flex-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 py-1.5 px-2 rounded transition-colors duration-150"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
