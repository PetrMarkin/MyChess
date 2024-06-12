export let timeControl: number;

export default function Select() {
  return (
    <label>
      Time Control:
      <select
        name='timeControl'
        onChange={(e) => {
          if (e.target.value === 'blitz') {
            timeControl = 300;
          }
          if (e.target.value === 'rapid') {
            timeControl = 1500;
          }
          if (e.target.value === 'classic') {
            timeControl = 9999;
          }
        }}
      >
        <option value='blitz'>Blitz</option>
        <option value='rapid'>Rapid</option>
        <option value='classic'>Classic</option>
      </select>
    </label>
  );
}
