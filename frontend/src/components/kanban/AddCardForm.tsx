import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createCard } from "../../features/cards/cardsAPI";

interface Props {
  columnId: string;
}

const AddCardForm = ({ columnId }: Props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const board = useAppSelector(state=>state.board.board)

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await dispatch(
      createCard({
          title,
          description,
          columnId,
          boardId: board!._id
      })
    );

    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-600 hover:text-black mt-3"
      >
        + Add Card
      </button>
    );
  }

  return (
    <div className="bg-white p-3 rounded shadow mt-3 space-y-2">
      <input
        className="w-full border rounded p-2 text-sm"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border rounded p-2 text-sm"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Add
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCardForm;
