import * as React from "react";

import * as Bootstrap from "reactstrap";

export const SellingPoint = props => <div className={["selling-point", props.className].join(" ")}>
	{props.children}
</div>;