export * from "../../Helpers";
import {
	Address
}from "../../Helpers";

export enum BookingStatus
{
	DRAFT,					// Before confirming
	CONFIRMED, 				// After confirming but not yet paying
	BOOKED, 				// When paid
	ENGINEER_DISPATCHED,
	ENGINEER_ENROUTE,
	ENGINEER_ARRIVED,
	COMPLETE
}

export class ListBooking
{
	id: any;
	serviceId: any;
	serviceGroupId: any;
	
	name: string;
	dateTime: Date;
	endTime: Date;

	status: BookingStatus;

	address: Address;

	constructor(props?: ListBooking) { Object.assign(this, props); }

	get durationText()
	{
		return "2 hours";
	}
}

export class EngineerLocation
{
	latitude: string;
	longitude: string;
	postcode: string;

	stopsAway: number;

	constructor(props?: EngineerLocation) { Object.assign(this, props); }
}

export class Engineer
{
	id: string;
	name: string;
	trade: string = "Your engineer";

	estimatedEarliestArrival: Date;
	estimatedLatestArrival: Date;

	location: EngineerLocation;
	
	constructor(props?: Engineer) { Object.assign(this, props); }
}

export class Booking extends ListBooking
{
	description: string = "";
	engineer: Engineer;

	constructor(props?: Booking)
	{
		super(props);
	}

	get estimatedText()
	{
		return "2 hours";
	}
}

