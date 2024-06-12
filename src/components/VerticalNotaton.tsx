import React, { FC } from 'react';

interface VerticalNotationProps {
  notationCells: Array<any>;
}

const VerticalNotation: FC<VerticalNotationProps> = ({ notationCells }) => {
  notationCells.push(React.createElement('div'));
  for (let i = 8; i >= 1; i--) {
    notationCells.push(React.createElement('div', null, i));
  }
  notationCells.push(React.createElement('div'));
  return (
    <div className={'notation-vert'}>
      {notationCells.map((item) => (
        <div className='cell'>{item}</div>
      ))}
    </div>
  );
};

export default VerticalNotation;
