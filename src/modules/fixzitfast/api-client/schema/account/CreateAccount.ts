export module CreateAccount
{
	export let Url = () => "/account/create";
	export let RequestType: string = "POST";

	export class Request
	{
		name: string;
		email: string;
		password: string;
		phone: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		id: string = "";
	
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

