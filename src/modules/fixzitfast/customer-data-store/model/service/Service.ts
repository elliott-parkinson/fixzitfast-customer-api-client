import Dependencies from "typedi";
import { observable, action } from "mobx";

export class Service
{
	@observable Id = "";
	@observable ParentId = "";

	@observable Name = "";
	@observable ImageUrl = "";

	@observable HourlyRate = 0;
	
	@observable Featured = false;
	@observable Popular = false;
}