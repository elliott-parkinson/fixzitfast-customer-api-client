export module Login
{
	export let Url = () => "/account/login";
	export let RequestType: string = "POST";


	export class Request
	{
		email: string;
		password: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		id: string = "";
	
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

