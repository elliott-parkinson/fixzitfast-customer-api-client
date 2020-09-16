export module UpdateUserDetails
{
	export let Url = id => "/account/" + id + "/update";
	export let RequestType: string = "POST";

	export class Request
	{
		name: string;
		email: string;
		password: string;
		phone: string;

		constructor(props?: Request) { Object.assign(this, props); }
	}

	export interface IResponseAccountDetails
	{
		iD: number;
		name: string;
		email: string;
		password: string;
		permissions: number;
		createdDate: string;
		updatedDate: string;
		archived: number;
		engineerID: number;
		companyID: number;
		acceptedTerms: number;
		acceptedMarketingSMS: number;
		acceptedMarketingEmail: number;
		validated: number;
	}
	
	export class Response
	{
		// accountDetails: IResponseAccountDetails;
	
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

