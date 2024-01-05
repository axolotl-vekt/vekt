import React from 'react';

function Card({ item, id, handleClick }) {
  const itemClass = item.state ? 'active' + item.state : '';

  return (
    <div
      className={'individualCards' + itemClass}
      onClick={() => handleClick(id)}
    >
      <img src={item.img} alt="" style={{ height: '10rem', width: '80%' }} />
    </div>
  );
}

export default Card;
