import { observable, action, toJS } from "mobx";
import { serialize, deserialize } from "serializer.ts/Serializer";
import { Type } from "serializer.ts/Decorators";

export class AddressDetails
{
	@observable Line1: string = "";
    @observable Line2: string = "";
    @observable Line3: string = "";
    @observable Town: string = "";
    @observable County: string = "";
    @observable Postcode: string = "";
    
    @action Update(line1: string, line2: string, line3: string, town: string, county: string, postcode: string)
    {
        this.Line1 = line1;
        this.Line2 = line2
        this.Line3 = line3
        this.Town = town;
        this.County = county;
        this.Postcode = postcode;

        console.warn("API Not implemented");
    }
}

export class CardDetails
{
	@observable CardType: string = "";
    @observable CardDigits: string = "";
    
    @action Update(cardType: string, cardName: string, cardNumber: string, expiry: string, ccv: string)
    {
        this.CardType = cardType;
        this.CardDigits = cardNumber.slice(11);

        console.warn("API Not implemented");
    }
}

export class CurrentUser
{
    @observable Id: string = null;
	@observable Name: string = "";
	@observable Email: string = "";
    @observable Phone: string = "";
    
    @Type(() => AddressDetails)
    @observable Address: AddressDetails = new AddressDetails;

    @Type(() => CardDetails)
    @observable Card: CardDetails = new CardDetails;
    
    @action UpdatePersonalDetails(name: string, email: string, phone: string)
    {
        this.Name = name;
        this.Email = email;
        this.Phone = phone;

        console.warn("API Not implemented");
    }

    @action async ResetPassword(oldPassword: string, password: string, passwordConfirm: string)
    {
        console.warn("API Not implemented");
    }


    Store()
    {
        let storage = window.localStorage;
		storage.setItem('fixzitfast.currentuser', serialize(this));
    }

    @action Load()
    {
        let storage = window.localStorage;
		let user = storage.getItem('fixzitfast.currentuser');
		if (user != undefined) deserialize(CurrentUser, user);
    }

    @action Clear()
    {
        this.Id = null;
        this.Name = "";
        this.Email = "";
        this.Phone = "";

        this.Address = new AddressDetails;
        this.Card = new CardDetails;

        let storage = window.localStorage;
		storage.clearItem('fixzitfast.currentuser');
    }
}