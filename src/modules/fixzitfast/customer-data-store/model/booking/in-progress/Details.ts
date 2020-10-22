import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";


export class Details
{
    @observable Description: string = "";
    
    @Skip()
    @observable Files: string[] = [];
    
    @action Set(description: string)
	{
		this.Description = description;
	}

	Get()
	{
		return {
			Description: this.Description,
		}	
	}

	@action UploadFile(id: string, url: string)
	{

	}
}