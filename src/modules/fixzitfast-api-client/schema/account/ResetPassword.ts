export module ResetPassword
{
	export let Url = () => "/account/resetpassword";
	export let RequestType: string = "POST";


	export class Request
	{
		Id: string;
		oldPassword: string;
		Password: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}
	
	export class Response
	{
		Id: string;
		oldPassword: string;
		Password: string;
	
		constructor(props?: Response) { Object.assign(this, props); }
	}
}
