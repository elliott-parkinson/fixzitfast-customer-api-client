import Dependencies from "typedi";
import { observable, action, toJS } from "mobx";
import { serialize, deserialize } from "serializer.ts/Serializer";
import { Type } from "serializer.ts/Decorators";

import { CurrentUser } from "./CurrentUser";

import stub from "../../../customer-store/data/Account";


export class Account
{
    @observable LoggedIn: boolean = false;

    @Type(() => CurrentUser)
    @observable CurrentUser = new CurrentUser;

    constructor()
    {
        this.Load();
    }

    @action async GetUserDetails()
    {
        if (this.LoggedIn == true)
        {
            return this.CurrentUser;
        }

        return null;
    }
    
    @action async Signup(name: string, email: string, phone: string, password: string, passwordConfirm: string, agree: boolean)
    {
        // this.LoggedIn = true;

		return true;
    }

    @action async Login(email: string, password: string)
    {
        this.LoggedIn = true;

        this.CurrentUser.Id = stub.Id;
        this.CurrentUser.Name = stub.Name;
        this.CurrentUser.Email = stub.Email;
        this.CurrentUser.Phone = stub.PhoneNumber;

        this.Store();

		return true;
    }

    @action async ForgotPassword(email: string)
    {
        // const notificationStore = Dependencies.of("store").get<any>("notifications");
        // notificationStore.Push("Resetting password succeded", "Your password has been reset", "success", 5);

        return true;
    }

    @action async Logout()
    {
        this.LoggedIn = false;
        this.CurrentUser.Clear();

        this.Store();

        return true;
    }

    Store()
    {
        let storage = window.localStorage;
		storage.setItem('fixzitfast.loggedin', this.LoggedIn == true ? "1" : "0");
		storage.setItem('fixzitfast.currentuser', JSON.stringify(serialize(this.CurrentUser)));
    }

    @action Load()
    {
        let storage = window.localStorage;
		let loggedin = storage.getItem('fixzitfast.loggedin');
        let user = storage.getItem('fixzitfast.currentuser');
        
        this.LoggedIn = loggedin && loggedin == "1" ? true : false;
        if (user != undefined)
        {
            this.CurrentUser = deserialize(CurrentUser, JSON.parse(user));
        }
    }

    @action Clear()
    {
        this.CurrentUser.Clear();

        let storage = window.localStorage;
		storage.removeItem('fixzitfast.loggedin');
		storage.removeItem('fixzitfast.currentuser');
    }
}