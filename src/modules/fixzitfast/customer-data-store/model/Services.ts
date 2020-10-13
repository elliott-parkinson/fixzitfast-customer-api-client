import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Type } from "serializer.ts/Decorators";

import { Service } from "./Service";
import { ServiceCategory } from "./ServiceCategory";


import services_stub from "../../customer-store/data/Services";
import categories_stub from "../../customer-store/data/ServiceCategories";

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
}


export class Services
{
	@Type(() => ServicesList)
	@observable Services: ServicesList = new ServicesList;

	@Type(() => CategoriesList)
	@observable Categories: CategoriesList = new CategoriesList;

	

}