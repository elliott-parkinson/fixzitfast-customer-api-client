import Dependencies from "typedi";
import { observable, action, toJS } from "mobx";
import { Type } from "serializer.ts/Decorators";

import stub from "../../../customer-store/data/Account";

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

        return true;
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

        return true;
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
        if (true)
		{
			this.Name = name;
			this.Email = email;
			this.Phone = phone;

			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Updating personal details succeded", "Your details have been updated", "success", 5);

            return true;
		}
		else
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			//notificationStore.Push("Updating personal details failed", response.ErrorMessage, "danger", 5);
		}
    }

    @action async ResetPassword(oldPassword: string, password: string, passwordConfirm: string)
    {
        if (true)
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			notificationStore.Push("Resetting password succeded", "Your password has been reset", "success", 5);

            return true;
		}
		else
		{
			const notificationStore = Dependencies.of("store").get<any>("notifications");
			//notificationStore.Push("Resetting password failed", response.ErrorMessage, "danger", 5);
		}
    }

    @action Clear()
    {
        this.Id = null;
        this.Name = "";
        this.Email = "";
        this.Phone = "";

        this.Address = new AddressDetails;
        this.Card = new CardDetails;
    }
}