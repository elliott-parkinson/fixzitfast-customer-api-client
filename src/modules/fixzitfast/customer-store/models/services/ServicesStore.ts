import Dependencies from "typedi";
import Quote from "../../data/Quote";
import stub from "../../data/Quote";
import featured_services_stub from "../../data/FeaturedServices";
import featured_categories_stub from "../../data/FeaturedServiceCategories";

import services_stub from "../../data/Services";
import categories_stub from "../../data/ServiceCategories";

export class Service
{
	Id: string;
	CategoryId: string;
	Name: string;
	IconUrl: string;

	ToJSON()
	{
		return JSON.stringify(this);
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

export class ServiceCategory
{
	Id: string;
	Name: string;
	IconUrl: string;

	ToJSON()
	{
		return JSON.stringify(this);
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

export class ServicesStore
{
	private LastUpdated: Date;

	private Services: Service[] = [];
	private FeaturedServices: Service[] = [];
	private PopularServices: Service[] = [];
	
	private ServiceCategories: ServiceCategory[] = [];
	private FeaturedServiceCategories: ServiceCategory[] = [];


	constructor()
	{
		this.Load();
		this.GetServices(true);
		this.GetPopularServices(true);
		this.GetServiceCategories(true);
		this.GetFeaturedServices(true);
		this.GetFeaturedServiceCategories(true);
		this.Store();
	}

	Store()
	{
		let storage = window.localStorage;

		let services = this.Services.map( item => item.ToJSON() );
		storage.setItem('fixzitfast.services.services', JSON.stringify(services));

		let featured_services = this.FeaturedServices.map( item => item.ToJSON() );
		storage.setItem('fixzitfast.services.featuredservices', JSON.stringify(featured_services));

		let popular_services = this.PopularServices.map( item => item.ToJSON() );
		storage.setItem('fixzitfast.services.popularservices', JSON.stringify(popular_services));


		let categories = this.ServiceCategories.map( item => item.ToJSON() );
		storage.setItem('fixzitfast.services.categories', JSON.stringify(categories));

		let featured_categories = this.FeaturedServiceCategories.map( item => item.ToJSON() );
		storage.setItem('fixzitfast.services.featuredcategories', JSON.stringify(featured_categories));

	}
	

	async Update()
	{
		await this.FetchServices();
		await this.FetchFeaturedServices();
		await this.FetchPopularServices();

		await this.FetchServiceCategories();
		await this.FetchFeaturedServiceCategories();
		this.Store();
	}

	Load()
	{
		let storage = window.localStorage;

		let services = storage.getItem('fixzitfast.services.services');
		if (services != undefined)
		{
			let items = JSON.parse(services);
			
			this.Services = items.map( item => {
				let category = new Service;
				category.FromJSON(item);
				return category;
			});
		}

		let featured_services = storage.getItem('fixzitfast.services.featuredservices');
		if (featured_services != undefined)
		{
			let items = JSON.parse(featured_services);
			
			this.FeaturedServices = items.map( item => {
				let category = new Service;
				category.FromJSON(item);
				return category;
			});
		}

		let popular_services = storage.getItem('fixzitfast.services.popularservices');
		if (popular_services != undefined)
		{
			let items = JSON.parse(popular_services);
			
			this.PopularServices = items.map( item => {
				let category = new Service;
				category.FromJSON(item);
				return category;
			});
		}

		let categories = storage.getItem('fixzitfast.services.categories');
		if (categories != undefined)
		{
			let items = JSON.parse(categories);
			
			this.ServiceCategories = items.map( item => {
				let category = new ServiceCategory;
				category.FromJSON(item);
				return category;
			});
		}

		let featured_categories = storage.getItem('fixzitfast.services.featuredcategories');
		if (featured_categories != undefined)
		{
			let items = JSON.parse(featured_categories);
			
			this.FeaturedServiceCategories = items.map( item => {
				let category = new ServiceCategory;
				category.FromJSON(item);
				return category;
			});
		}
	}

	get FullServicesList()
	{
		let list = [];

		if (this.Services.length !== 0 && this.ServiceCategories.length !== 0)
		{
			let services = [];
			this.Services.forEach( service => service.CategoryId == "" && services.push(service) );

			this.Services.forEach( service => {
				if (service.CategoryId !== "")
				{
					let parent = this.ServiceCategories.find(result => result.Id == service.CategoryId);
					if (parent != undefined)
					{
						list.push({ Id: service.Id, Name: parent.Name + " - " + service.Name });
					}
				}
			});
		}

		return list;
	}

	async FetchServices()
	{
		this.Services = services_stub.map( item => {
			let category = new Service;
			category.FromJSON(item);
			return category;
		});
	}
	async GetServices(force: boolean = false): Promise<Service[]>
	{
		if (this.Services.length === 0 || force == true)
		{
			await this.FetchServices();
		}

		return this.Services;
	}


	async FetchFeaturedServices()
	{
		this.FeaturedServices = featured_services_stub.map( item => {
			let category = new Service;
			category.FromJSON(item);
			return category;
		});
	}
	async GetFeaturedServices(force: boolean = false): Promise<Service[]>
	{
		if (this.FeaturedServices.length === 0 || force == true)
		{
			await this.FetchFeaturedServices();
		}

		return this.FeaturedServices;
	}

	async FetchPopularServices()
	{
		this.PopularServices = services_stub.map( item => {
			let category = new Service;
			category.FromJSON(item);
			return category;
		});
	}
	async GetPopularServices(force: boolean = false): Promise<Service[]>
	{
		if (this.PopularServices.length === 0 || force == true)
		{
			await this.FetchPopularServices();
		}

		return this.PopularServices;
	}

	async FetchServiceCategories()
	{
		this.ServiceCategories = categories_stub.map( item => {
			let category = new ServiceCategory;
			category.FromJSON(item);
			return category;
		});
	}
	async GetServiceCategories(force: boolean = false): Promise<ServiceCategory[]>
	{
		if (this.ServiceCategories.length === 0 || force == true)
		{
			await this.FetchServiceCategories();
		}

		return this.ServiceCategories;
	}
	async FetchFeaturedServiceCategories()
	{
		this.FeaturedServiceCategories = featured_categories_stub.map( item => {
			let category = new ServiceCategory;
			category.FromJSON(item);
			return category;
		});
	}
	async GetFeaturedServiceCategories(force: boolean = false): Promise<ServiceCategory[]>
	{
		if (this.FeaturedServiceCategories.length === 0 || force == true)
		{
			await this.FetchFeaturedServiceCategories();
		}

		return this.FeaturedServiceCategories;
	}
}