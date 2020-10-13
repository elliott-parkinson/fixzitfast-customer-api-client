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
		
		accountStore.SetUserId(1);
		await accountStore.FetchDetails();

		this.LoggedIn = true;

		routeStore.Go("/");

		return this.LoggedIn;
	}

	@action async Signup(name: string, email: string, password: string, phone: string)
	{


		return true;
	}

	
	@action async ForgotPassword(email: string)
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");
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

	@action async Logout()
	{
        let accountStore = Dependencies.of("fixzitfast-customer-store").get<any>("account");
		accountStore.ClearDetails();
		
		this.LoggedIn = false;
	}
}