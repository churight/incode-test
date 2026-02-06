// components/BoardPage.tsx
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Column } from './Column';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';
import { moveCard } from '../features/cards/cardsAPI';

export const BoardPage = () => {
  const board = useAppSelector(state => state.board.board);
  const columns = useAppSelector(state => state.column.items);
  const cards = useAppSelector(state => state.cards.items);
  const loading = useAppSelector(state => state.board.loading);
  const error = useAppSelector(state => state.board.error);
  const dispatch = useAppDispatch();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!board) return <div>No board loaded. Use the form above to load or create one.</div>;
  if (columns.length === 0) return <div>Board has no columns yet.</div>;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a valid droppable
    if (!destination) return;

    // Dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //const sourceColumnId = source.droppableId;
    const destColumnId = destination.droppableId;

    // Get cards in destination column
    const destCards = cards
      .filter(c => c.columnId === destColumnId)
      .sort((a, b) => a.position - b.position);

    // Calculate new position
    let newPosition: number;
    if (destCards.length === 0) {
      newPosition = 1;
    } else if (destination.index === 0) {
      newPosition = 1;
    } else if (destination.index >= destCards.length) {
      newPosition = destCards[destCards.length - 1].position + 1;
    } else {
      newPosition = destination.index + 1;
    }

    // Dispatch move action
    dispatch(moveCard({
      cardId: draggableId,
      columnId: destColumnId,
      position: newPosition
    }));
  };

  return (
    <div>
      <h2>{board.name}</h2>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', gap: 16, padding: 20 }}>
          {columns.map(column => (
            <Column key={column._id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};