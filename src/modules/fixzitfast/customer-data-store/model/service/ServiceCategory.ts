import Dependencies from "typedi";
import { observable, action } from "mobx";

export class ServiceCategory
{
	@observable Id = "";
	@observable ParentId = "";

	@observable EngineerType = "Unknown";
	
	@observable Name = "";
	@observable IconUrl = "";

	@observable HourlyRate = 0;
	
	@observable Featured = false;
}