import * as React from "react";
import Dependencies from "typedi";

import { 
    Fragment,
    Button,
	Toast, ToastHeader, ToastBody,
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

export namespace StandardNotification
{
    export interface IViewProps
    {
        notification: {
            Type: string;
            TitleText: string;
            DescriptionText: string;

            Close: Function;
        }
    }

    export class Component extends React.Component<IViewProps>
    {
        render() {
            return <Toast className={ this.props.notification ? "toast-" + this.props.notification.Type : "" }>
                <ToastHeader toggle={e => this.props.notification.Close()}>
                    {this.props.notification.TitleText}
                </ToastHeader>
                <ToastBody>
                    {this.props.notification.DescriptionText}
                </ToastBody>
            </Toast>;
        }
    }
}