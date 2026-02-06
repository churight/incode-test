import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { deleteCard } from '../features/cards/cardsAPI';
import type{ Card as CardType } from '../types/card';
import { CardForm } from './CardForm';

type Props = {
  card: CardType;
};

export const Card = ({ card }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  if (isEditing) {
    return (
      <CardForm
        columnId={card.columnId}
        card={card}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div>
      <h4>{card.title}</h4>
      <p>{card.description}</p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button onClick={() => dispatch(deleteCard(card._id))}>
          Delete
        </button>
      </div>
    </div>
  );
};
