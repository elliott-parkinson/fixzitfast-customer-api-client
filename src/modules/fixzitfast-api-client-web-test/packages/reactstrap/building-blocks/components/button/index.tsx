import * as React from "react";
import * as Bootstrap from "reactstrap";

export const Button = props => <Bootstrap.Button {...props}>
	{props.children}
</Bootstrap.Button>;