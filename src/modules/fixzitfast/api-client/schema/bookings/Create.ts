export namespace Create
{
	export let Url = () => "/bookings/create";
	export let RequestType: string = "POST";

	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		bookingId: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

