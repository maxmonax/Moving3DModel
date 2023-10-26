import { ShowElements } from "model";
import React, { useState, useEffect, useContext } from "react";


const Menu = (props: any) => {

    const Handler = () => {
        ShowElements();
    }

    return(
        <div className={`Menu${props.hidden ? " hidden" : ""}`}>
            <div className="MenuInner">
            <div className="menuItem">
                {props.heading}
            </div>
                <div className="menuItem" onClick={Handler}>
                    Way 1
                </div>
                <div className="menuItem" onClick={Handler}>
                    Way 2
                </div>
                <div className="menuItem" onClick={Handler}>
                    Way 3
                </div>
            </div>
        </div>
    )
}

export default Menu