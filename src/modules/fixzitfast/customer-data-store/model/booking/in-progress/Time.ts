import Dependencies from "typedi";
import { observable, action } from "mobx";

import moment from "moment";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";

export class Time
{
    @Type(() => Date)
	@observable Date: Date = null;
	@observable DateId: number = null;
    
    @observable TimeSlotText: string = "";
    
	@observable Agree: boolean = false;
        
    @action Set(date: Date, agree: boolean)
	{
		this.Date = date;
		this.DateId = date.getTime();
		
		this.SetTimeSlot();
	}

	@action SetTimeSlot()
	{
		if (this.DateId != null)
		{
			this.TimeSlotText = moment(this.Date).format('h:mm A MMMM, Do YYYY');
		}
		else
		{
			this.TimeSlotText = "";
		}
	}
}