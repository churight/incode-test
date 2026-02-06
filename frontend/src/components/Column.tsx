import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { Card } from './Card';
import { CardForm } from './CardForm';
import { Droppable } from 'react-beautiful-dnd';
import type { Column as ColumnType } from '../types/column';

type Props = {
  column: ColumnType;
};

export const Column = ({ column }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  
  const cards = useAppSelector(state =>
    state.cards.items
      .filter(c => c.columnId.toString() === column._id.toString())
      .sort((a, b) => a.position - b.position)
  );

  return (
    <div style={{ 
      minWidth: 280,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h3 style={{ 
        margin: 0, 
        padding: 16,
        borderBottom: '1px solid #ddd',
        color: '#666'
      }}>
        {column.type}
      </h3>

      <Droppable droppableId={column._id.toString()} isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={true}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            style={{
              padding: 16,
              minHeight: 400,
              flexGrow: 1,
              backgroundColor: snapshot.isDraggingOver ? '#e3f2fd' : 'transparent',
              transition: 'background-color 0.2s ease',
            }}
          >
            {cards.map((card, index) => (
              <Card 
                key={card._id.toString()} 
                card={card} 
                index={index} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div style={{ padding: 16, paddingTop: 0 }}>
        {isAdding ? (
          <CardForm
            columnId={column._id}
            onClose={() => setIsAdding(false)}
          />
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            style={{ 
              width: '100%', 
              padding: 8,
              backgroundColor: 'transparent',
              border: '2px dashed #ccc',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 14,
              color: '#666'
            }}
          >
            + Add Card
          </button>
        )}
      </div>
    </div>
  );
};