import React, { FC } from "react";

interface HorizontalNotationProps {
    notationCells: Array<any>;
    letters: Array<string>
}

const HorizontalNotation: FC<HorizontalNotationProps> = ({notationCells, letters}) => {
    letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    for (let i = 0; i < 8;) {
        notationCells.push(React.createElement('div', null, letters[i]));
        i++;
    } 
    return (
        <div
          className={"notation-hor"}
        >
            {notationCells.map(item => <div className="cell">{item}</div>)}
        </div>
    )
}

export default HorizontalNotation;