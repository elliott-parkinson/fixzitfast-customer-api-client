export namespace ProcessCardPayment
{
	export let Url = id => "/booking/" + id + "/processcard";
	export let RequestType: string = "POST";

	export class Request
	{
		bookingId: number;
		userId: number;
		cardNumber
		cardName: string;
		cardExpiry: string;
		cvc: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		bookingId: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

