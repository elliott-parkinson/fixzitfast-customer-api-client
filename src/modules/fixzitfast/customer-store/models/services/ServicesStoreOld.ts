import Dependencies from "typedi";
import { observable, action } from "mobx";


import { Service } from "./Service";


export class ServicesStore
{
	@observable Featured = new Map<number, Service>();
	@observable Services = new Map<number, Service>();

	@action async Update()
	{
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<Api>("api");

		try
		{
			let response = await apiStore.Services.List();
			if (response.Success == true)
			{
				let services = response.Data.services;

				for (let service of services)
				{
					this.Services.set(service.id, new Service(service) );
				}
			}
			else
			{
				throw response.ErrorMessage;
			}
		}
		catch (exception)
		{
			throw "Unexpected response from API.";
		}
	}

	@action async UpdateFeatured()
	{
		try
		{
			
		}
		catch (exception)
		{
			throw "Unexpected response from API.";
		}
	}

	@action async UpdatePopular()
	{
		const notificationStore = Dependencies.of("store").get<any>("notifications");
		notificationStore.Push("Popular services error", "Popular services API does not exist.", "danger", 5);
	}
}