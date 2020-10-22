import Dependencies from "typedi";
import Quote from "../../../customer-store/data/Quote";
import stub from "../../../customer-store/data/Quote";

export class CustomerQuote
{
	AvatarUrl: string;

	Name: string;
	Excerpt: string;

	ToJSON()
	{
		return JSON.stringify(this);
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

export class Customers
{
	private LastUpdated: Date;

	private TotalCustomers: number;
	private CustomerQuote: CustomerQuote;

	constructor()
	{
		this.Load();
		this.GetTotalCustomers(true);
		this.GetCustomerQuote(true);
		this.Store();
	}

	Store()
	{
		let storage = window.localStorage;
		storage.setItem('fixzitfast.customers.total', this.TotalCustomers?.toString());
		
		if (this.CustomerQuote != undefined)
		{
			storage.setItem('fixzitfast.customers.quote', this.CustomerQuote?.ToJSON() );
		}
	}
	

	Update()
	{
		this.FetchTotalCustomers();
		this.FetchCustomerQuote();
		this.Store();
	}

	Load()
	{
		let storage = window.localStorage;
		let total = storage.getItem('fixzitfast.customers.total');
		if (total != undefined)
		{
			this.TotalCustomers = parseInt(total);
		}

		let quote = storage.getItem('fixzitfast.customers.quote');
		if (quote != undefined)
		{
			this.CustomerQuote = new CustomerQuote;
			this.CustomerQuote.FromJSON(quote);
		}
	}

	async FetchTotalCustomers()
	{
		this.TotalCustomers = 122981;
	}
	async GetTotalCustomers(force: boolean = false): Promise<number>
	{
		if (this.TotalCustomers == undefined || force == true)
		{
			await this.FetchCustomerQuote();
		}

		return this.TotalCustomers;
	}
	
	async FetchCustomerQuote()
	{
		let quote = new CustomerQuote;
		quote.FromJSON(stub);

		this.CustomerQuote = quote;
	}
	async GetCustomerQuote(force: boolean = false): Promise<CustomerQuote>
	{
		if (this.CustomerQuote == undefined || force == true)
		{
			await this.FetchCustomerQuote();
		}

		return this.CustomerQuote;
	}
}