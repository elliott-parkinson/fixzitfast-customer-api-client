import Dependencies from "typedi";
import { observable, action } from "mobx";
import stub from "../../data/Account";


export class AccountStore
{
	@observable Id: string = null;
	@observable Name: string = "";
	@observable Email: string = "";
	@observable Phone: string = "";
	@observable CardType: string = "";
	@observable CardDigits: string = "";

	@action SetUserId(id: number)
	{
		this.Id = id;
	}

	@action async FetchDetails()
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");

		this.Id = stub.Id;
		this.Name = stub.Name;
		this.Email = stub.Email;
		this.Phone = stub.PhoneNumber;
	}

	@action async UpdateUserDetails(name: string, email: string, phone: string)
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");

		if (true)
		{
	
			this.Id = stub.Id;
			this.Name = stub.Name;
			this.Email = stub.Email;
			this.Phone = stub.PhoneNumber;


			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Updating personal details succeded", "Your details have been updated", "success", 5);
		}
		else
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Updating personal details failed", response.ErrorMessage, "danger", 5);
		}
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
	}

	@action async ResetPassword(oldPassword: string, password: string, passwordConfirm: string)
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<any>("api");
		let routeStore: any = Dependencies.of("store").get("routes");

		if (true)
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
		this.Id = null;
		this.Name = "";
		this.Email = "";
		this.Phone = "";
	}
}