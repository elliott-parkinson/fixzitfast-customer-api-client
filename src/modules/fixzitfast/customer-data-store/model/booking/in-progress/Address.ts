import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";


export class Address
{
	@observable Latitude: number = -1;
	@observable Longitude: number = -1;

	@observable Line1: string = "";
	@observable Line2: string = "";
	@observable Line3: string = "";
	@observable Town: string = "";
	@observable County: string = "";
    @observable Postcode: string = "";


    @action SetCoordinates(latitude: number, longitude: number)
	{

	}
        
    @action Set(line1: string, line2: string, line3: string, town: string, county: string, postcode: string)
	{

	}
}