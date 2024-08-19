import React, { FC } from 'react';
import Select from './Select';

interface HeaderProps {
  restart: () => void;
}

const HeaderComponent: FC<HeaderProps> = ({ restart }) => {
  return (
    <div className='header'>
      <div className='logo-wrapper'>
        <div className='logo-img'></div>
        <h1 className='logo-name'>MyChess</h1>
      </div>
      <Select restart={restart} />
    </div>
  );
};

export default HeaderComponent;
