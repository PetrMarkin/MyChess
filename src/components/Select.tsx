import { useDispatch } from 'react-redux';
import { setTimeFormat } from '../store/timeFormatSlice';
import { FC } from 'react';

interface SelectProps {
  restart: () => void;
}

const Select: FC<SelectProps> = ({ restart }) => {
  const dispatch = useDispatch();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let time = 0;
    switch (e.target.value) {
      case 'blitz':
        time = 300;
        break;
      case 'rapid':
        time = 1500;
        break;
      case 'classic':
        time = 9999;
        break;
      default:
        time = 300;
    }
    dispatch(setTimeFormat(time));
    restart();
  };

  return (
    <label>
      Time Control:
      <select name='timeControl' onChange={handleSelect}>
        <option value='blitz'>Blitz</option>
        <option value='rapid'>Rapid</option>
        <option value='classic'>Classic</option>
      </select>
    </label>
  );
};

export default Select;
