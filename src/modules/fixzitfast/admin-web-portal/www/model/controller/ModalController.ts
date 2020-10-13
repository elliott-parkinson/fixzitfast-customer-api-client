import { action, observable } from "mobx";

export class ModalController
{
    @observable IsOpen: boolean = false;
    
    @observable TitleText: string = "";
    @observable DescriptionText: string = "";

    @action Open(title: string, description: string)
    {
        this.TitleText = title;
        this.DescriptionText = description;
        this.IsOpen = true;
    }

    @action Close()
    {
        this.TitleText = "";
        this.DescriptionText = "";
        this.IsOpen = false;
    }

    @action Toggle()
    {
        this.IsOpen = !this.IsOpen;
    }
}