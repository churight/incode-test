import { Droppable, Draggable } from "react-beautiful-dnd";
import type { Column as ColumnType } from "../../types/column";
import type { Card } from "../../types/card";
import { CardItem } from "./CardItem";
import AddCardForm from "./AddCardForm";

interface Props {
  column: ColumnType;
  cards: Card[];
}

export const Column = ({ column, cards }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm w-80 flex-shrink-0 flex flex-col h-fit max-h-[calc(100vh-12rem)]">
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-base">
            {column.type}
          </h2>
          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
            {cards.length}
          </span>
        </div>
      </div>

      <Droppable droppableId={column._id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 px-3 py-2 space-y-2 overflow-y-auto min-h-[200px] transition-colors duration-200 ${
              snapshot.isDraggingOver
                ? "bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg"
                : "bg-gray-50"
            }`}
          >
            {cards.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                Drop cards here
              </div>
            )}

            {cards.map((card, index) => (
              <Draggable key={card._id} draggableId={card._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CardItem card={card} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="px-3 pb-3 pt-1 bg-white rounded-b-xl">
        <AddCardForm columnId={column._id} />
      </div>
    </div>
  );
};
