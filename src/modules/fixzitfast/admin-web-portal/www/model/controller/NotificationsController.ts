import { action, observable, toJS } from "mobx";

export class NotificationController
{
    @observable OnClose: Function;
    
    @observable Type: string = "";
    @observable TitleText: string = "";
    @observable DescriptionText: string = "";

    constructor(title: string, description: string, type: string, onClose?: Function, timeout: number = 5000)
    {
        this.Type = type;
        this.TitleText = title;
        this.DescriptionText = description;
        this.OnClose = onClose;

        setTimeout( e => this.Close(), timeout);
    }


    @action Close()
    {
        if (this.OnClose)
        {
            this.OnClose(this);
        }
    }
}

export class NotificationsController
{
    @observable Notifications: NotificationController[] = [];

    @action Push(title: string, description: string, type: string, timeout: number = 8)
    {
        let notification = new NotificationController(title, description, type, n => this.CloseSpecificNotification(n), timeout * 1000);

        this.Notifications.push(notification);
    }

    @action CloseSpecificNotification(notification: NotificationController)
    {
        let index = this.Notifications.indexOf(notification);
        this.Notifications.splice(index, 1);
    }
}