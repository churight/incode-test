import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllBoards } from "../features/board/boardSlice";
import { useNavigate } from "react-router-dom";
import BoardCard from "../components/boards/BoardCard";
import CreateBoardForm from "../components/boards/CreateBoardForm";

export const BoardsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardList } = useAppSelector((state) => state.board);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
          Kanban Boards
        </h1>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-8 p-6">
          <CreateBoardForm />
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-8 p-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
              className="flex-1 border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg px-4 py-2.5 outline-none transition-all duration-200 placeholder:text-gray-400"
              placeholder="Search by hashId"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!search.trim()}
            >
              Open Board
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardList.map((board) => (
            <BoardCard key={board._id} board={board} />
          ))}
        </div>

        {boardList.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No boards found. Create your first board to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
