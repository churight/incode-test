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

  const [isEditing, setIsEditing]= useState<boolean>(false);
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
      })
    );

    setIsEditing(false);
  };

  return (
    <div className="bg-white p-5 rounded shadow hover:shadow-lg transition space-y-3">
      {isEditing ? (
        <>
          <input
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div onClick={() => navigate(`/board/${board.hashId}`)}>
            <h2 className="text-lg font-semibold cursor-pointer">
              {board.name}
            </h2>
            <p className="text-sm text-gray-500">{board.hashId}</p>
          </div>

          <div className="flex gap-3 text-sm">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="text-red-600"
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
