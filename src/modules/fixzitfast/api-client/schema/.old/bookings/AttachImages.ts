import { Booking } from "./Helpers";
import { Address } from "../../Helpers";

export namespace AttachImages
{
	export class Request
	{
		id: any;
		images: string[]; // Base64 encoded strings

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export interface IImage
	{
		id: any;
		url: string;

	}
	
	export class Response
	{
		images: IImage[] = [];

		constructor(props?: Request) { Object.assign(this, props); }
	}
}

