import { Container as Services } from "typedi";
import { observable, action } from "mobx";


export class SiteStore
{
	@observable Title: string = "HighTech Portal";
	@observable TitleComponents: any;

	constructor()
	{

	}
}