import Dependencies from "typedi";
import { observable, action } from "mobx";


import { Service } from "./Service";


export class ServicesStore
{
	@observable Featured = new Map<number, Service>();
	@observable Services = new Map<number, Service>();

	@action async Update()
	{
		
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