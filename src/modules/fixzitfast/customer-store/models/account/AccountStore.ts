import Dependencies from "typedi";
import { observable, action } from "mobx";


export class AccountStore
{
	@observable Id: number = -1;
	@observable Name: string = "";
	@observable Email: string = "";
	@observable Phone: string = "";

	@action SetUserId(id: number)
	{
		this.Id = id;
	}

	@action async FetchDetails()
	{
		let apiStore = Dependencies.of("store").get<any>("api");

		let userDetailsResponse = await apiStore.Account.GetUserDetails(this.Id);
		let accountDetails = userDetailsResponse.Data.accountDetails;

		this.Id = accountDetails.id ? accountDetails.name : accountDetails.ID;
		this.Name = accountDetails.name ? accountDetails.name : accountDetails.Name;
		this.Email = accountDetails.email ? accountDetails.email : accountDetails.Email;
		this.Phone = accountDetails.phone ? accountDetails.phone : accountDetails.Phone;
	}

	@action async ClearDetails()
	{
		this.Id = -1;
		this.Name = "";
		this.Email = "";
		this.Phone = "";
	}
}