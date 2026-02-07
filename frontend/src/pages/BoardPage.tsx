import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { fetchBoardByHash } from "../features/board/boardSlice";
import { KanbanBoard } from "../components/kanban/KanbanBoard";

export const BoardPage = () => {
  const { hashId } = useParams<{ hashId: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hashId) {
      dispatch(fetchBoardByHash(hashId));
    }
  }, [hashId, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="h-full">
        <KanbanBoard />
      </div>
    </div>
  );
};
