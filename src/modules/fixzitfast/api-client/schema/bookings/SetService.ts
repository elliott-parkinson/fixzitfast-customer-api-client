export namespace SetService
{
	export let Url = id => "/bookings/" + id + "/service";
	export let RequestType: string = "POST";

	export class Request
	{
		serviceId: number;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		bookingId: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

