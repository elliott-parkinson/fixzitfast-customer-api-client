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
    @observable CategoryType: string = "";
    

        
    @action Set(id: string, name: string)
	{
        this.Id = id;
        this.Name = name;
    }
    
    @action SetCategory(categoryId: string, categoryName: string, categoryType: string)
	{
        this.CategoryId = categoryId;
        this.CategoryName = categoryName;
        this.CategoryType = categoryType;
	}
}