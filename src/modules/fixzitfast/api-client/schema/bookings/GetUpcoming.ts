export namespace GetUpcoming
{
	export let Url = userId => "/bookings/" + userId + "/upcoming";
	export let RequestType: string = "POST";

	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

