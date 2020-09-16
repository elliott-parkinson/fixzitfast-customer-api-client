export namespace SetDetails
{
	export let Url = id => "/bookings/" + id + "/details";
	export let RequestType: string = "POST";

	export class Request
	{
		repairType: string;
		details: string;
		file: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		bookingId: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

