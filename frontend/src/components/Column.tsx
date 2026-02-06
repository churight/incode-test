import { useAppSelector } from '../app/hooks';
import { Card } from './Card';
import type{ Column as ColumnType } from '../types/column';
import { useState } from 'react';
import { CardForm } from './CardForm';

type Props = {
  column: ColumnType;
};

export const Column = ({ column }: Props) => {
    const [isAdding, setIsAdding] = useState(false);

  const cards = useAppSelector(state =>
    state.cards.items
      .filter(c => c.columnId === column._id)
      .sort((a, b) => a.position - b.position)
  );

  return (
    <div>
      <h3>{column.type}</h3>

      {cards.map(card => (
        <Card key={card._id} card={card} />
      ))}

      {isAdding ? (
            <CardForm 
            columnId={column._id}
            onClose = {()=>setIsAdding(false)}
            />
        ) : (
            <button
                onClick={()=>setIsAdding(true)}
            >
                + Add Card
            </button>
        )
      }
    </div>
  );
};
