
import * as React from "react";
import "./service-category-icon.scss";

export namespace ServiceCategoryIcon
{
    export interface IViewProps
    {
        src: string;
    }

    export class Component extends React.Component<any>
    {
        render() {
            return <img className="service-category-icon" src={this.props.src} />;
        }
    }
}