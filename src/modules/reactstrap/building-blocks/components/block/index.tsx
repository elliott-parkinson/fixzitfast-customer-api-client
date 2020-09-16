import * as React from "react";
import * as Bootstrap from "reactstrap";

export const Block = props => <div className={[
		"block", 
		props.background ? "block-" + props.background : undefined,
		props.full != undefined ? "block-full" : undefined,
		props.className
	].join(" ")} style={props.style}>
	{ props.full == undefined ? <Bootstrap.Container>
		{props.children}
	</Bootstrap.Container> : props.children }
</div>;