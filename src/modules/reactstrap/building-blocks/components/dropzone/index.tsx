import * as React from "react";
import * as Bootstrap from "reactstrap";

export interface IDropzoneProps
{
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactChild | React.ReactChild[];
	disabled?: boolean;
	accept: string;
	multiple?: boolean;
	onSelect?: (event: React.ChangeEvent) => void;
}

export const Dropzone = (props: IDropzoneProps) => <Bootstrap.InputGroup
	className="dropzone"
	style={{...props.style }}>
		<Bootstrap.Input type="file" accept={props.accept} multiple={props.multiple} onChange={event => props.onSelect ? props.onSelect(event) : null}
			disabled={props.disabled == true ? true : undefined}
			style={{
				position: "absolute",
				opacity: "0",
				left: "0",
				right: "0",
				top: "0",
				bottom: "0",
			}}
		/>
		{ props.children }
</Bootstrap.InputGroup>;