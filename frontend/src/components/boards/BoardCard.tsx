import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import type { Board } from "../../types/board";
import { useNavigate } from "react-router-dom";
import { deleteBoard, updateBoard } from "../../features/board/boardSlice";

interface Props {
  board: Board;
}

const BoardCard = ({ board }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(board.name);

  const handleDelete = async () => {
    await dispatch(deleteBoard(board._id));
  };

  const handleUpdate = async () => {
    if (!name.trim()) return;

    await dispatch(
      updateBoard({
        id: board._id,
        name,
      }),
    );

    setIsEditing(false);
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 overflow-hidden">
      {isEditing ? (
        <div className="p-5 space-y-3">
          <input
            autoFocus
            className="w-full border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all duration-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
              if (e.key === "Escape") setIsEditing(false);
            }}
          />

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={!name.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors duration-150 shadow-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setName(board.name);
                setIsEditing(false);
              }}
              className="flex-1 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-150"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => navigate(`/board/${board.hashId}`)}
            className="p-5 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-150">
              {board.name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                {board.hashId}
              </span>
            </div>
          </div>

          <div className="px-5 pb-4 pt-2 border-t border-gray-100 bg-gray-50 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="flex-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 px-3 rounded-lg transition-colors duration-150"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="flex-1 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 py-2 px-3 rounded-lg transition-colors duration-150"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BoardCard;
