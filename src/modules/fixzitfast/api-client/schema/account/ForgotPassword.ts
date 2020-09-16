export module ForgotPassword
{
	export let Url = () => "/account/forgotpassword";
	export let RequestType: string = "POST";


	export class Request
	{
		email: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		id: string = "";
	
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

