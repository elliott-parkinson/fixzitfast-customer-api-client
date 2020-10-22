import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";


export class Service
{
	@observable Id: string = "";
    @observable Name: string = "";
    
	@observable CategoryId: string = "";
    @observable CategoryName: string = "";
        
    @action Set(id: string, name: string, categoryId: string, categoryName: string)
	{
        this.Id = id;
        this.Name = name;
        this.CategoryId = categoryId;
        this.CategoryName = categoryName;

        console.warn(id, name, categoryId, categoryName);
	}
}