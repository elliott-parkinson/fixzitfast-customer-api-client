import { Booking } from "./Helpers";
import { Address } from "../Helpers";

export namespace New
{
	export class Request
	{
		temporaryId: any;
		serviceId: any;
		serviceGroupId: any;

		address: Address;
		description: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		id: any;
		temporaryId: any;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

