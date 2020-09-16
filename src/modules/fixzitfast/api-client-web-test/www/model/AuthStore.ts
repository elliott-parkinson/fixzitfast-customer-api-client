import Dependencies from "typedi";
import { observable, action } from "mobx";


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

	@observable Id: number = -1;
	@observable Name: string = "";
	@observable Email: string = "";
	@observable Phone: string = "";

	@action async PopulateDetails(user: IUser)
	{
		this.LoggedIn = true;
		Object.assign(this, user);

		let routes: any = Dependencies.of("store").get("routes");
		routes.Go("/");
	}
	
	@action async Login(user: IUser)
	{
		this.LoggedIn = true;
		Object.assign(this, user);

		let routes: any = Dependencies.of("store").get("routes");
		routes.Go("/");
	}

	@action async Logout()
	{
		this.Id = -1;
		this.Name = "";
		this.Email = "";
		this.Phone = "";

		this.LoggedIn = false;
	}
}