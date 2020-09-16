export namespace SetLocation
{
	export let Url = id => "/bookings/" + id + "/location";
	export let RequestType: string = "POST";

	export class Request
	{
		address1: string;
		address2: string;
		address3: string;
		town: string;
		county: string;
		postcode: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		bookingId: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

