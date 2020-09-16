import { Address } from "../Helpers";

export namespace UpdateLocationDetails
{
	export class Request
	{
		id: any;
		address: Address;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		id: any;
		address: Address;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

