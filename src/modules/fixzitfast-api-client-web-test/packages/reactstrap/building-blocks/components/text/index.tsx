import * as React from "react";

import * as Bootstrap from "reactstrap";

export const Paragraph = props => <p className={props.className} style={props.style}>
	{props.children}
</p>;

export const Sentence = props => <span className={props.className} style={props.style}>
	{props.children}
</span>;

export const NewLine = props => <br />;
export const Rule = props => <hr />;

export const Header = props => <React.Fragment>
	{{
		xs: <h5 className={props.className} style={props.style}>{props.children}</h5>,
		sm: <h4 className={props.className} style={props.style}>{props.children}</h4>,
		md: <h3 className={props.className} style={props.style}>{props.children}</h3>,
		lg: <h2 className={props.className} style={props.style}>{props.children}</h2>,
		xl: <h1 className={props.className} style={props.style}>{props.children}</h1>,
	}[props.size ? props.size : "md"]}
</React.Fragment>;