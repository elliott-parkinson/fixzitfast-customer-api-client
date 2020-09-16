import Dependencies from "typedi";
import { observable, action } from "mobx";


export interface IBooking
{
	Id: number;
}

export class BookingStore
{
	@observable Id: number = -1;

	
}