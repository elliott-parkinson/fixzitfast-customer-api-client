import Dependencies from "typedi";
import { observable, action, computed } from "mobx";


export class ContactStore
{
	@observable Error: string = "";


	@action async SubmitContactRequest(name: string, email: string, phone: string, message: string, agree: boolean)
	{


		return true;
	}
}