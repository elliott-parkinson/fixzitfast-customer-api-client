import * as React from "react";

export interface IIconProps
{
	className: string;
	icon: string;

	solid?: boolean;
	regular?: boolean;
	light?: boolean;
	duotone?: boolean;
	brand?: boolean;
}

export class Icon extends React.Component<IIconProps>
{
	get ClassString()
	{
		let classString = "fa";
		this.props?.solid == true && (classString += "s");
		this.props?.regular == true && (classString += "r");
		this.props?.light == true && (classString += "l");
		this.props?.duotone == true && (classString += "l");
		this.props?.brand == true && (classString += "b");

		classString += " " + this.props.icon;

		if (this.props.className)
		{
			classString += " " + this.props.className;
		}

		return classString;

	}
	render() {
		return <i className={this.ClassString} />
	}
}


