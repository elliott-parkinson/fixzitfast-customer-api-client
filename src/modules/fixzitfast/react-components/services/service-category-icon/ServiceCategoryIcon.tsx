
import * as React from "react";
import "./service-category-icon.scss";

export namespace ServiceCategoryIcon
{
    export interface IViewProps
    {
        src: string;
        isService?: boolean;
    }

    export class Component extends React.Component<any>
    {
        render() {
            return <img
                className={"service-category-icon " + (this.props.isService ? "service" : "") }
                src={this.props.src}
            />;
        }
    }
}