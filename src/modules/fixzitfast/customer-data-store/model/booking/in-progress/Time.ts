import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";

export class Time
{
    @Type(() => Date)
	@observable Date: Date = null;
    
    @observable TimeSlotId: string = "";
    @observable TimeSlotText: string = "";
    
	@observable Agree: boolean = false;
        
    @action Set(date: Date, timeSlotId: string, timeSlotText: string, agree: boolean)
	{

	}
}