import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createBoard, getAllBoards } from "../../features/board/boardSlice";

const CreateBoardForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");

  const handleCreate = async () => {
    if (!name.trim()) return;

    const res = await dispatch(createBoard({ name }));

    if (createBoard.fulfilled.match(res)) {
      setName("");
      dispatch(getAllBoards());
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <input
        className="flex-1 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400"
        placeholder="Board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleCreate}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create
      </button>
    </div>
  );
};

export default CreateBoardForm;
