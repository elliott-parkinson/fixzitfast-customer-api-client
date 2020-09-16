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
		let apiStore = Dependencies.of("store").get<any>("api");
        let accountStore = Dependencies.of("store").get<any>("account");
		let routeStore: any = Dependencies.of("store").get("routes");
		
		let response =  await apiStore.Account.Login(email, password);
		if (response.Success == true)
		{
			accountStore.SetUserId(response.Data.id);
			await accountStore.FetchDetails();

			this.LoggedIn = true;
			routeStore.Go("/");
		}
		else
		{
			this.LoggedIn = false;
			this.Error = response.ErrorMessage;
		}
	}

	@action async Logout()
	{
        let accountStore = Dependencies.of("store").get<any>("account");
		accountStore.ClearDetails();
		
		this.LoggedIn = false;
	}
}