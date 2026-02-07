import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { moveCard } from "../../features/cards/cardsAPI";
import { Column } from "./Column";
import { useNavigate } from "react-router-dom";

export const KanbanBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.column.items);
  const cards = useAppSelector((state) => state.cards.items);
  const board = useAppSelector((state) => state.board.board);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    dispatch(
      moveCard({
        cardId: draggableId,
        columnId: destination.droppableId,
        position: destination.index,
      }),
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/`)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="text-lg">←</span>
              <span>Back to Boards</span>
            </button>

            <div className="flex flex-col items-end gap-1">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {board?.name || "Loading..."}
              </h1>
              {board?.hashId && (
                <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                  {board.hashId}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <DragDropContext onDragEnd={handleDragEnd}>
        <main className="flex-1 overflow-hidden">
          <div className="h-full px-4 sm:px-6 lg:px-8 py-6">
            {/* Centered columns container */}
            <div className="flex justify-center h-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              <div className="flex gap-4 sm:gap-6">
                {columns.map((column) => (
                  <Column
                    key={column._id}
                    column={column}
                    cards={cards
                      .filter((c) => c.columnId === column._id)
                      .sort((a, b) => a.position - b.position)}
                  />
                ))}
              </div>

              {columns.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No columns yet
                    </h3>
                    <p className="text-gray-500">
                      Create your first column to start organizing tasks
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </DragDropContext>
    </div>
  );
};
