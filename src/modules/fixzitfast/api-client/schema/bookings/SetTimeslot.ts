export namespace SetTimeslot
{
	export let Url = id => "/bookings/" + id + "/timeslot";
	export let RequestType: string = "POST";

	export class Request
	{
		date: string;
		timeStart: string;
		timeFinish: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		bookingId: number;

		constructor(props?: Response) { Object.assign(this, props); }
	}
}

