import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Type } from "serializer.ts/Decorators";

import { Service } from "./Service";
import { ServiceCategory } from "./ServiceCategory";


import services_stub from "../../../customer-store/data/Services";
import categories_stub from "../../../customer-store/data/ServiceCategories";

export class ServicesList
{
	@Type(() => Date)
	@observable LastUpdated: Date;

	@Type(() => Service)
	@observable List: Service[] = [];

	@action async Fetch()
	{
		this.List = services_stub.map( item => deserialize(Service, item) );
	}

	Featured()
	{
		return this.List.filter(item => item.Featured == true);
	}

	Popular()
	{
		return this.List.filter(item => item.Popular == true);
	}
}

export class CategoriesList
{
	@Type(() => Date)
	@observable LastUpdated: Date;

	@Type(() => ServiceCategory)
	@observable List: ServiceCategory[] = [];

	@action async Fetch()
	{
		this.List = categories_stub.map( item => deserialize(ServiceCategory, item) );
	}

	Featured()
	{
		return this.List.filter(item => item.Featured == true);
	}
}


export class Services
{
	@Type(() => ServicesList)
	@observable Services: ServicesList = new ServicesList;

	@Type(() => CategoriesList)
	@observable Categories: CategoriesList = new CategoriesList;

    constructor()
    {
        this.Load();
    }


	Store()
    {
        let storage = window.localStorage;
		storage.setItem('fixzitfast.services.categories', JSON.stringify( serialize(this.Categories) ));
		storage.setItem('fixzitfast.services.services', JSON.stringify( serialize(this.Services) ));
    }

    @action Load()
    {
		let storage = window.localStorage;
		
		let categories: any = storage.getItem('fixzitfast.services.categories');
		if (categories != undefined)
		{
			this.Categories = deserialize(CategoriesList, JSON.parse(categories) );
		}

		let services: any = storage.getItem('fixzitfast.services.services');
		if (services != undefined)
		{
			this.Services = deserialize(ServicesList, JSON.parse(services) );
		}
    }

    @action Clear()
    {
        this.Categories.List = [];
        this.Services.List = [];

        let storage = window.localStorage;
		storage.removeItem('fixzitfast.services.services');
		storage.removeItem('fixzitfast.services.categories');
    }
}