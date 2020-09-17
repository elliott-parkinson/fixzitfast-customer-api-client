export namespace AddCardDetails
{
	export let Url = id => "/booking/" + id + "/addcard";
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

