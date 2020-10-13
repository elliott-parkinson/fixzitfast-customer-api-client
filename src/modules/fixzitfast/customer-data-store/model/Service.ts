import Dependencies from "typedi";
import { observable, action } from "mobx";

export class Service
{
	@observable Id = -1;
	@observable ParentId = -1;

	@observable Name = "";
	@observable ImageUrl = "";

	@observable HourlyRate = 0;


}