export module CreateAccount
{
	export let Url = () => "/account/create";
	export let RequestType: string = "POST";


	export class Request
	{
		Name: string;
		Email: string;
		Password: string;
		Phone: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		id: string = "";
	
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

