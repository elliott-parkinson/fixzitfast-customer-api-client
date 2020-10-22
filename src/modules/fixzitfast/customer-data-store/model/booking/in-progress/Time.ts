import Dependencies from "typedi";
import { observable, action } from "mobx";

import moment from "moment";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";

export class Time
{
    @Type(() => Date)
	@observable DateId: number = null;
	@observable Date: Date = null;
    
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
		this.TimeSlotText = moment(this.Date).format('h:mm A MMMM, Do YYYY');
	}
}