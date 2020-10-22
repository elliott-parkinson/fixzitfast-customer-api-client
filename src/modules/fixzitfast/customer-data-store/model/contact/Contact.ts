import { observable, action, toJS } from "mobx";


export class Contact
{
    @action async SubmitRequest(name: string, email: string, phone: string, description: string, readTerms: boolean)
    {
        
    }
}