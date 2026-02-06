import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { deleteCard } from '../features/cards/cardsAPI';
import { Draggable } from 'react-beautiful-dnd';
import type { Card as CardType } from '../types/card';
import { CardForm } from './CardForm';

type Props = {
  card: CardType;
  index: number;
};

export const Card = ({ card, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  if (isEditing) {
    return (
      <div style={{ marginBottom: 8 }}>
        <CardForm
          columnId={card.columnId}
          card={card}
          onClose={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <Draggable draggableId={card._id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            border: '1px solid #ddd',
            padding: 12,
            marginBottom: 8,
            borderRadius: 4,
            backgroundColor: snapshot.isDragging ? '#fff' : 'white',
            boxShadow: snapshot.isDragging 
              ? '0 5px 15px rgba(0,0,0,0.3)' 
              : '0 1px 3px rgba(0,0,0,0.1)',
            cursor: 'grab',
            userSelect: 'none',
            transform: snapshot.isDragging ? 'rotate(3deg)' : 'none',
            ...provided.draggableProps.style,
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: 16, color: '#666'}}>{card.title}</h4>
          {card.description && (
            <p style={{ 
              margin: '0 0 12px 0', 
              fontSize: 14, 
              color: '#666',
              lineHeight: 1.4
            }}>
              {card.description}
            </p>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => setIsEditing(true)}
              style={{
                padding: '4px 8px',
                fontSize: 12,
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button 
              onClick={() => dispatch(deleteCard(card._id))}
              style={{
                padding: '4px 8px',
                fontSize: 12,
                cursor: 'pointer',
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                color: '#c00'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};