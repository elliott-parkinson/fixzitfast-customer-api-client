import Dependencies from "typedi";
import { observable, action, computed } from "mobx";


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
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");
        let accountStore = Dependencies.of("fixzitfast-customer-store").get<any>("account");
		let routeStore: any = Dependencies.of("store").get("routes");
		
		let response =  await apiStore.Account.Login(email, password);
		if (response.Success == true)
		{
			accountStore.SetUserId(response.Data.id);
			await accountStore.FetchDetails();

			this.LoggedIn = true;
			this.Error = "";

			routeStore.Go("/");
		}
		else
		{
			this.LoggedIn = false;
			this.Error = response.ErrorMessage;

			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Login Failed", this.Error, "danger", 5);
		}

		return this.LoggedIn;
	}

	@action async Signup(name: string, email: string, password: string, phone: string)
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");
		
		let response =  await apiStore.Account.Signup(name, email, password, phone);
		if (response.Success == true)
		{
			this.Error = "";
		}
		else
		{
			this.Error = response.ErrorMessage;

			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Login Failed", this.Error, "danger", 5);
		}

		return response.Success;
	}

	
	@action async ForgotPassword(email: string, password: string)
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");
		
		let response =  await apiStore.Account.ForgotPassword(email);
		if (response.Success == true)
		{
			this.Error = "";
		}
		else
		{
			this.Error = response.ErrorMessage;

			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Forgot Password Failed", this.Error, "danger", 5);
		}

		return response.Success;
	}

	@action async Logout()
	{
        let accountStore = Dependencies.of("fixzitfast-customer-store").get<any>("account");
		accountStore.ClearDetails();
		
		this.LoggedIn = false;
	}
}