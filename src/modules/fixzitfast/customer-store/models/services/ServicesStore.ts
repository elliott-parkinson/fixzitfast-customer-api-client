import Dependencies from "typedi";
import { observable, action } from "mobx";


import { Api } from "../../../api-client/rest/";
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
		let apiStore = Dependencies.of("fixzitfast-customer-store").get<Api>("api");
		
		try
		{
			let response = await apiStore.Services.ListFeatured();
			if (response.Success == true)
			{
				let services = response.Data.services;

				for (let service of services)
				{
					if (service.parent !== -1)
					{
						this.Featured.set(service.id, new Service(service) );
					}
					else
					{
						const notificationStore = Dependencies.of("store").get<any>("notifications");
						notificationStore.Push("Featured services error", "Featured service: '" + service.name + "' has a parent and is therefore a category and not a service.", "danger", 5);
					}
				}
			}
			else
			{
				throw response.ErrorMessage;
			}

			if (this.Featured.size < 4)
			{
				const notificationStore = Dependencies.of("store").get<any>("notifications");
				notificationStore.Push("Featured services error", "At least 4 featured servies should load. Only " + this.Featured.size + " were/was found on the api.", "danger", 5);
			}
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