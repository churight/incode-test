import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createBoard } from "../../features/board/boardSlice";
import { useNavigate } from "react-router-dom";

const CreateBoardForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  const handleCreate = async () => {
    if (!name.trim()) return;

    const res = await dispatch(createBoard({ name }));

    if (createBoard.fulfilled.match(res)) {
      navigate(`/board/${res.payload.board.hashId}`);
    }
  };

  return (
    <div className="flex gap-3">
      <input
        className="border p-2 rounded w-64"
        placeholder="Board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </div>
  );
};

export default CreateBoardForm;
