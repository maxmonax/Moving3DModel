import React, { useState, useEffect, useContext } from "react";


export const RightMenu = (props: any) => {

    return(
        <div className="rightMenu">
            <div className="rmInner">
                {props.text}
            </div>
        </div>
    )
}