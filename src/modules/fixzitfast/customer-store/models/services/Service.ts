import Dependencies from "typedi";
import { observable, action, toJS } from "mobx";

export class Service
{
	@observable Id = -1;
	@observable ParentId = -1;
	@observable Name = "";
	@observable ImageUrl = "";
	@observable HourlyRate = 0;

	constructor(props: any)
	{
		this.Id = props.id;
		this.ParentId = props.parent;
		this.Name = props.name;
		this.ImageUrl = props.icon;
		this.HourlyRate = props.hourlyRate;
	}
}