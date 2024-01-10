import React from "react"

export  default function Die({value, isHeld, holdDie}){

    return(
        <button className={`box btn ${isHeld ? 'btn-primary':'btn-light'}`} onClick={holdDie}>
            {value}
        </button>
    )
}