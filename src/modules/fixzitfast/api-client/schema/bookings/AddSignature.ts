export namespace AddSignature
{
	export let Url = id => "/booking/" + id + "/signature";
	export let RequestType: string = "POST";

	export class Request
	{
		bookingId: number;
		signatureData: any;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		id: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

