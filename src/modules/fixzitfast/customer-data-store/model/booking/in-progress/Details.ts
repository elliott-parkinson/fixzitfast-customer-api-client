import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";


export class Details
{
	@observable Type: string = "";
    @observable Description: string = "";
    
    @Skip()
    @observable Files: string[] = [];
    
    @action Set(type: string, description: string)
	{

	}

	@action UploadFile(id: string, url: string)
	{

	}
}