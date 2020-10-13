import Dependencies from "typedi";
import { observable, action } from "mobx";
import { serialize, deserialize } from "serializer.ts/Serializer";
import { Type } from "serializer.ts/Decorators";


export enum BOOKINGCLASSIFICATIONS
{
	FIX = "fix",
	FASTFIX = "fastfix",
	EMERGENCY = "emergency"
}

export enum BOOKINGTYPES
{
	UPCOMING = "upcoming",
	PAST = "past"
}

export class AddressDetails
{
	@observable Line1: string = "";
    @observable Line2: string = "";
    @observable Line3: string = "";
    @observable Town: string = "";
    @observable County: string = "";
    @observable Postcode: string = "";
}


export class BookingListItem
{
	@observable Id = "";
	@observable CategoryId = "";
	@observable ServiceId = "";

	@observable Timeslot = "";

    @Type(() => AddressDetails)
	@observable Address: AddressDetails = new AddressDetails;


	@observable Type: BOOKINGTYPES = BOOKINGTYPES.UPCOMING;
	@observable Classification: BOOKINGCLASSIFICATIONS = BOOKINGCLASSIFICATIONS.FIX;
}