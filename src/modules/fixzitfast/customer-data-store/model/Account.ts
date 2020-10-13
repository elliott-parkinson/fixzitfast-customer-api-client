import { observable, action, toJS } from "mobx";
import { CurrentUser } from "./CurrentUser";


export class Account
{
    @observable LoggedIn: boolean = false;
    @observable CurrentUser = new CurrentUser;
    
    @action async Login(email: string, password: string)
    {
        this.LoggedIn = true;
    }

    @action async ForgotPassword(email: string)
    {
        
    }

    @action async Logout()
    {
        this.LoggedIn = false;
        this.CurrentUser.Clear();
    }
}