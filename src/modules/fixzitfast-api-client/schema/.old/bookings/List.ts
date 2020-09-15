import { ListBooking } from "./Helpers";

export namespace List
{
	export class Request
	{
		archived?: boolean = false;
	
		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		bookings: ListBooking[] = [];

		constructor(props?: Response)
		{
			Object.assign(this, props);

			this.bookings = props.bookings.map(booking => new ListBooking(booking));
		}
	}
}

