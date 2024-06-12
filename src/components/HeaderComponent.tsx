import React, { FC } from "react";
import Select from "./Select";

const HeaderComponent: FC = () => {
    return (
        <div className="header">
            <div className="logo-wrapper">
                <div className="logo-img"></div>
                <h1 className="logo-name">MyChess</h1>
            </div>
            {Select()};
        </div>
    )
}

export default HeaderComponent;