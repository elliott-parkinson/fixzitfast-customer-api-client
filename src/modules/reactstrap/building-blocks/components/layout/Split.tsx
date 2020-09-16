import * as React from "react";

export const Split = props => <div 
    className={["app-split", props.className, props.fill != undefined ? "fill" : undefined].join(" ")}
>
    {props.children}
</div>


export const Fill = props => <div className={["app-split-fill", props.className].join(" ")}>
    {props.children}
</div>

export const Exist = props => <div className={["app-split-use", props.className].join(" ")}>
    {props.children}
</div>