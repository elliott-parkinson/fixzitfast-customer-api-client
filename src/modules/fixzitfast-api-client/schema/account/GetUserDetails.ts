export module GetUserDetails
{
	export let Url = id => "/account/" + id + "/getdetails";
	export let RequestType: string = "POST";

	export class Request
	{
		constructor(props?: Request) { Object.assign(this, props); }
	}

	export interface IResponseAccountDetails
	{
		ID: number;
		Name: string;
		Email: string;
		Password: string;
		Permissions: number;
		CreatedDate: string;
		UpdatedDate: string;
		Archived: number;
		EngineerID: number;
		CompanyID: number;
		AcceptedTerms: number;
		AcceptedMarketingSMS: number;
		AcceptedMarketingEmail: number;
		Validated: number;
	}
	
	export class Response
	{
		accountDetails: IResponseAccountDetails;
	
		constructor(props?: Response) { Object.assign(this, props); }
	}
}

