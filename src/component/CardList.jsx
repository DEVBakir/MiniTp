import React from 'react';
import Card from './Card';

function CardList({ data, onDelete, onUpdate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 justify-items-center">
      {data.map((element) => (
        <Card
          key={element.id}
          product={element}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default CardList;
