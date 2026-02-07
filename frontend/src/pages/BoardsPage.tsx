import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllBoards} from "../features/board/boardSlice";
import { useNavigate } from "react-router-dom";
import BoardCard from "../components/boards/BoardCard";
import CreateBoardForm from "../components/boards/CreateBoardForm";

export const BoardsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardList } = useAppSelector(state => state.board);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/board/${search}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Boards</h1>

      <CreateBoardForm />

      <div className="flex gap-3 mt-6 mb-10">
        <input
          className="border p-2 rounded w-64"
          placeholder="Search by hashId"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Open
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {boardList.map(board => (
          <BoardCard key={board._id} board={board} />
        ))}
      </div>
    </div>
  );
};
