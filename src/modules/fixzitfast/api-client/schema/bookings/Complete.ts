export namespace Complete
{
	export let Url = id => "/bookings/" + id + "/paymentconfirmation";
	export let RequestType: string = "POST";

	export class Request
	{
		name: string;
		email: string;
		password: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		bookingId: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

