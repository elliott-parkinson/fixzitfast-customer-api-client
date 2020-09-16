import * as React from "react";

export const InnerContent = props => <div className={["app-inner-content", props.className].join(" ")}>
    {props.children}
</div>