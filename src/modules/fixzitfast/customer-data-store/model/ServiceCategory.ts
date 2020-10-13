import Dependencies from "typedi";
import { observable, action } from "mobx";

export class ServiceCategory
{
	@observable Id = -1;
	@observable ParentId = -1;
	
	@observable Name = "";
	@observable IconUrl = "";

	@observable HourlyRate = 0;
}