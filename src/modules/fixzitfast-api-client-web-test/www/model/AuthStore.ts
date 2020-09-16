import { Container as Services } from "typedi";
import { observable, action } from "mobx";


export interface IUser
{
	Id: number;
	NickName: string;
	FirstName: string;
	LastName: string;
	Phone: string;
	Company: string;
}

export class AuthStore
{
	@observable LoggedIn: boolean = false;

	@observable Id: number = -1;
	@observable NickName: string = "";
	@observable FirstName: string = "";
	@observable LastName: string = "";
	@observable Phone: string = "";
	@observable Company: string = "";
	
	@action Login(user: IUser)
	{
		this.LoggedIn = true;
		Object.assign(this, user);
	}

	@action Logout()
	{
		this.Id = -1;
		this.LoggedIn = false;
	}
}