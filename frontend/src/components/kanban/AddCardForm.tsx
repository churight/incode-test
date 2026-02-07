import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCard } from "../../features/cards/cardsAPI";
import { updateCard } from "../../features/cards/cardsAPI";
import type { Card } from "../../types/card";

interface Props {
  columnId: string;
  mode?: "create" | "edit";
  initialData?: Card;
  onClose?: () => void;
}

const AddCardForm = ({
  columnId,
  mode = "create",
  initialData,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.board);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setIsOpen(true);
    }
  }, [mode, initialData]);

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (mode === "create") {
      await dispatch(
        createCard({
          title,
          description,
          columnId,
          boardId: board!._id,
        }),
      );
    }

    if (mode === "edit" && initialData) {
      await dispatch(
        updateCard({
          id: initialData._id,
          title,
          description,
        }),
      );
    }

    setTitle("");
    setDescription("");
    setIsOpen(false);

    if (onClose) onClose();
  };

  if (mode === "create" && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-left text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors duration-150 flex items-center gap-2 group"
      >
        <span className="text-lg leading-none group-hover:scale-110 transition-transform">
          +
        </span>
        <span>Add card</span>
      </button>
    );
  }

  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg shadow-lg p-3 space-y-2.5 animate-in fade-in duration-200">
      <input
        autoFocus
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 placeholder:text-gray-400"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
          if (e.key === "Escape") {
            handleCancel();
          }
        }}
      />

      <textarea
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2 text-sm outline-none transition-all duration-200 resize-none placeholder:text-gray-400"
        placeholder="Description (optional)"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            handleCancel();
          }
        }}
      />

      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-150 shadow-sm hover:shadow"
        >
          {mode === "create" ? "Add card" : "Save changes"}
        </button>

        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;
