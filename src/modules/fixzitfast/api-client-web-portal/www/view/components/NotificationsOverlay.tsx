import * as React from "react";
import Dependencies from "typedi";

import { 
    Fragment,
    Button,
	Toast, ToastHeader, ToastBody,
} from "../Theme";

import { observer } from "mobx-react";
import { observable, computed, action, toJS } from "mobx";
import { StandardNotification } from "./StandardNotification";

export namespace NotificationsOverlay
{
    export interface IViewProps
    {
        notifications: any[];
    }

    @observer
    export class Component extends React.Component<IViewProps>
    {
        @observable Notifications;

        componentDidMount()
        {
            this.Notifications = Dependencies.of("store").get<any>("notifications");
        }

        render() {
            return <div className="notifications-overlay">
                { this.Notifications?.Notifications?.map( notification => 
                    <StandardNotification.Component
                        key={notification}
                        notification={notification}
                    />
                )}
            </div>;
        }
    }
}