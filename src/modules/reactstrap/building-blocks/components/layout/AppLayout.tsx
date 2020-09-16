import * as React from "react";
import * as Bootstrap from "reactstrap";

export interface IContentProps
{
	resizable?: boolean;
	component: React.ReactChild[] | React.ReactChild | string;
}

export interface IAppLayoutProps
{
	className?: string;
	style?: React.CSSProperties;

	columns?: 1|2|3;
	compactSidebar?: boolean;
	sidebar?: IContentProps;
	content?: IContentProps;
	helper?: IContentProps;

	center?: {
		row: boolean;
		column: boolean;
	}
}

export const AppLayout = (props: IAppLayoutProps) => <div className={"app-layout columns-"+props.columns}
>
	{ props.columns >=2 && props.sidebar && <div className={"app-sidebar" + (props.compactSidebar == true ? " compact" : "")}>{props.sidebar.component}</div> }
	{ props.columns >=1 && props.content && <div className={"app-content" + (props.compactSidebar == true ? " compact" : ""}>{props.content.component}</div> }
</div>;