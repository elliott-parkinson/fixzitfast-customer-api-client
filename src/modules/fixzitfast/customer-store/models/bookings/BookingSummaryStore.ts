import Dependencies from "typedi";
import { observable, action, toJS } from "mobx";

export class Service
{
	@observable Id: number = -1;
	@observable Name: string = "";

	ToJSON()
	{
		return this;
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

export class Location
{
	@observable Latitude: number = -1;
	@observable Longitude: number = -1;

	@observable Line1: string = "";
	@observable Line2: string = "";
	@observable Line3: string = "";
	@observable Town: string = "";
	@observable County: string = "";
	@observable Postcode: string = "";

	ToJSON()
	{
		return this;
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

export class Details
{
	@observable Type: string = "";
	@observable Description: string = "";
	@observable Files: string[] = [];

	@action AddFile(id: string, url: string)
	{

	}

	ToJSON()
	{
		return this;
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}
export class TimeDetails
{
	@observable Day: string = "";
	@observable HourBlock: string = "";
	@observable Agree: boolean = false;

	ToJSON()
	{
		return this;
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

export class ContactDetails
{
	@observable Name: string = "";
	@observable PhoneNumber: string = "";
	@observable Email: string = "";

	ToJSON()
	{
		return this;
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

export class BookingSummaryStore
{
	@observable Id: number = -1;

	@observable Service: Service = new Service;
	@observable Location: Location = new Location;
	@observable Details: Details = new Details;
	@observable Time: TimeDetails = new TimeDetails;
	@observable ContactDetails: ContactDetails = new ContactDetails;

	constructor(fresh: boolean = false)
	{
		if (fresh == true)
		{
			return;
		}

		this.Load();
	}

	Store()
	{
		let storage = window.localStorage;
		storage.setItem('fixzitfast.bookings.current', JSON.stringify(toJS(this)));
	}

	Update()
	{
		this.Store();
	}

	Load()
	{
		let storage = window.localStorage;
		let booking = storage.getItem('fixzitfast.bookings.current');
		if (booking != undefined)
		{
			let item = JSON.parse(booking);
			
			this.Id = item.Id;
			this.Service.FromJSON(item.Service);
			this.Location.FromJSON(item.Location);
			this.Details.FromJSON(item.Details);
			this.Time.FromJSON(item.Time);
			this.ContactDetails.FromJSON(item.ContactDetails);
		}
	}
}