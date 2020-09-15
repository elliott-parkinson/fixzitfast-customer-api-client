export namespace SubmitForm
{
	export let Url = () => "/contact/form";
	export let RequestType: string = "POST";

	export class Request
	{
		name: string = "";
		email: string = "";
		phone: string = "";
		comments: string = "";
		// acceptTerms: boolean = false;
	
		constructor(props?: Request) { Object.assign(this, props); }
	}

	export class Response
	{
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

