import React from 'react';

function Track({ track, onAdd, onRemove }) {
  const handleAdd = () => {
    onAdd(track);
  };
  const handleRemove = () => {
    onRemove(track);
  };

  return (
    <div>
      {/* Track details */}
      <button onClick={handleAdd}>+</button>
      <button onClick={handleRemove}>-</button>
    </div>
  );
}

export default Track;
