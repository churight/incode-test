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
    <div className="bg-gray-200 rounded p-4 w-72 min-h-[500px] flex flex-col">
      <h2 className="font-bold mb-4">{column.type}</h2>

      <Droppable droppableId={column._id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-3 transition ${
              snapshot.isDraggingOver ? "bg-gray-300" : ""
            }`}
          >
            {cards.map((card, index) => (
              <Draggable
                key={card._id}
                draggableId={card._id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <CardItem
                      card={card}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <AddCardForm columnId={column._id} />
    </div>
  );
};

export default Column;
