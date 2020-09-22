import Dependencies from "typedi";
import { observable, action } from "mobx";


export class Details
{
	@observable Type: string = "";
	@observable Description: string = "";
	@observable Files: string[] = [];
}

export class BookingSummaryStore
{
	@observable Id: number = -1;

	@observable ServiceId: number = -1;
	@observable ServiceName: string = "";

	
	@observable LocationString: string = "";
	@observable Details: Details = new Details;

}