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
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");

		let userDetailsResponse = await apiStore.Account.GetUserDetails(this.Id);
		let accountDetails = userDetailsResponse.Data.accountDetails;

		this.Id = accountDetails.id ? accountDetails.id : accountDetails.ID;
		this.Name = accountDetails.name ? accountDetails.name : accountDetails.Name;
		this.Email = accountDetails.email ? accountDetails.email : accountDetails.Email;
		this.Phone = accountDetails.phone ? accountDetails.phone : accountDetails.Phone;
	}

	@action async UpdateUserDetails(name: string, email: string, phone: string)
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");

		let response = await apiStore.Account.UpdateUserDetails(this.Id, name, email, phone);
		if (response.Success == true)
		{
			let accountDetails = response.Data.accountDetails;
	
			this.Id = accountDetails.id ? accountDetails.id : accountDetails.ID;
			this.Name = accountDetails.name ? accountDetails.name : accountDetails.Name;
			this.Email = accountDetails.email ? accountDetails.email : accountDetails.Email;
			this.Phone = accountDetails.phone ? accountDetails.phone : accountDetails.Phone;


			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Updating personal details succeded", "Your details have been updated", "success", 5);
		}
		else
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Updating personal details failed", response.ErrorMessage, "danger", 5);
		}
	}

	@action async ResetPassword(oldPassword: string, password: string, passwordConfirm: string)
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");

		let response = await apiStore.Account.ResetPassword(this.Id, password, oldPassword);
		if (response.Success == true)
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Resetting password succeded", "Your password has been reset", "success", 5);
		}
		else
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Resetting password failed", response.ErrorMessage, "danger", 5);
		}
	}

	@action async ClearDetails()
	{
		this.Id = -1;
		this.Name = "";
		this.Email = "";
		this.Phone = "";
	}
}