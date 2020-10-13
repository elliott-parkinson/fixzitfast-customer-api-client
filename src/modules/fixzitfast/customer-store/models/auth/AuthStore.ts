import Dependencies from "typedi";
import { observable, action, computed, toJS } from "mobx";


export interface IUser
{
	Id: number;
	Name: string;
	Email: string;
	Phone: string;
}

export class AuthStore
{
	@observable LoggedIn: boolean = false;

	@observable Error: string = "";

	@action async Login(email: string, password: string)
	{
        let accountStore = Dependencies.of("fixzitfast-customer-store").get<any>("account");
		let routeStore: any = Dependencies.of("store").get("routes");
		
		accountStore.SetUserId(1);
		await accountStore.FetchDetails();

		this.LoggedIn = true;
		
		this.Store();

		routeStore.Go("/");

		return this.LoggedIn;
	}

	@action async Signup(name: string, email: string, password: string, phone: string)
	{
		return true;
	}

	
	@action async ForgotPassword(email: string)
	{
		let routeStore: any = Dependencies.of("store").get("routes");

		if (true)
		{
			routeStore.Go("/");


			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Resetting password succeded", "Your password has been reset", "success", 5);
		}
		else
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Resetting password failed", response.ErrorMessage, "danger", 5);
		}
	}
	@action async Logout()
	{
        let accountStore = Dependencies.of("fixzitfast-customer-store").get<any>("account");
		accountStore.ClearDetails();
		
		this.LoggedIn = false;

		let storage = window.localStorage;
		storage.removeItem('fixzitfast.auth');
		storage.removeItem('fixzitfast.account');
	}

	Store()
	{
		let storage = window.localStorage;
		storage.setItem('fixzitfast.auth', JSON.stringify(toJS(this)));

        let accountStore = Dependencies.of("fixzitfast-customer-store").get<any>("account");
		storage.setItem('fixzitfast.account', JSON.stringify(toJS(accountStore)));
	}

	Update()
	{
		this.Store();
	}

	Load()
	{
		let storage = window.localStorage;
		let auth = storage.getItem('fixzitfast.auth');

		if (auth != undefined)
		{
			let item = JSON.parse(auth);
			

			this.LoggedIn = item.LoggedIn;
		}

		
        let accountStore = Dependencies.of("fixzitfast-customer-store").get<any>("account");
		let account = storage.getItem('fixzitfast.account');
		if (account != undefined)
		{
			let item = JSON.parse(account);

			accountStore.Id = item.Id;
			accountStore.Name = item.Name;
			accountStore.Email = item.Email;
			accountStore.Phone = item.Phone;
		}
	}
}
