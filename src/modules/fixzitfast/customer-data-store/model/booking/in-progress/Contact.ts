import Dependencies from "typedi";
import { observable, action } from "mobx";

import { serialize, deserialize } from "serializer.ts/Serializer";
import { Skip, Type } from "serializer.ts/Decorators";

export class Contact
{
	@observable Name: string = "";
    @observable Email: string = "";
	@observable PhoneNumber: string = "";
    
    @action Set(name: string, email: string, phone: string)
	{
		this.Name = name;
		this.Email = email;
		this.PhoneNumber = phone;
	}

	Get()
	{
		return {
			Name: this.Name,
			Email: this.Email,
			PhoneNumber: this.PhoneNumber,
		}
	}
}