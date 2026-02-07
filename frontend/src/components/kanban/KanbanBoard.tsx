import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { moveCard } from "../../features/cards/cardsAPI";
import { Column } from "./Column";
import { useNavigate } from "react-router-dom";

export const KanbanBoard = () =>{
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const columns = useAppSelector(state => state.column.items);
    const cards = useAppSelector(state => state.cards.items);

    const handleDragEnd = (result:DropResult) =>{
        const {source, destination, draggableId} = result;

        if(!destination) return;

        if(
            source.droppableId === destination.droppableId && source.index === destination.index
        ) return;

        dispatch(moveCard({
            cardId: draggableId,
            columnId: destination.droppableId,
            position: destination.index
        }))
    }

    return(
        <div>
            <button onClick={()=> navigate(`/`)}> Back to Boards</button>
            <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 overflow-x-auto pb-4">
                {columns.map(column => (
                <Column
                    key={column._id}
                    column={column}
                    cards={cards
                    .filter(c => c.columnId === column._id)
                    .sort((a, b) => a.position - b.position)
                    }
                />
                ))}
            </div>
        </DragDropContext>
        </div>
        
    )
}