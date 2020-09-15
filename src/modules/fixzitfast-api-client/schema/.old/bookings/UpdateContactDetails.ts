import { Booking } from "./Helpers";
import { Address } from "../Helpers";

export namespace UpdateContactDetails
{
	export class Request
	{
		id: any;
		name: string;
		phone: string;
		email: string;

		createAccount: boolean = false;
		agreeDetailsProcessing: boolean = false;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export interface IImage
	{
		id: any;
		url: string;

	}
	
	export class Response
	{
		id: any;
		name: string;
		phone: string;
		email: string;

		createAccount: boolean = false;
		agreeDetailsProcessing: boolean = false;

		constructor(props?: Request) { Object.assign(this, props); }
	}
}

