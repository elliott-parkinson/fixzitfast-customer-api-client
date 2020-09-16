import {
	Address,
	Booking
} from "./Helpers";

export namespace Availability
{
	export class Request
	{
		address: Address;
		day: Date;
	
		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class PricedDate
	{
		startDateTime: Date;
		finishDateTime: Date;
		price: number;
		currency: string = "GBP";
	
		constructor(props?: PricedDate) { Object.assign(this, props); }
	}
	
	export class DatesAndPrices
	{
		dates: PricedDate[];
	
		constructor(props?: DatesAndPrices)
		{
			Object.assign(this, props);

			this.dates = props.dates.map(date => new PricedDate(date));
		}
	}
	
	export class Response
	{
		id: any;
		date: Date;
		dates: DatesAndPrices;

		constructor(props?: Response)
		{
			this.id = props.id;
			this.date = props.date;
			this.dates = new DatesAndPrices(props.dates);
		}
	}
}

