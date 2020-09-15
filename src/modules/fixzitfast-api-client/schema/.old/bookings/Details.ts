import { Booking } from "./Helpers";

export namespace Details
{
	export class Request
	{
		id: any;
	
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		booking: Booking;

		constructor(props?: Response)
		{
			Object.assign(this, props);

			this.booking = new Booking(props.booking);
		}
	}
}

