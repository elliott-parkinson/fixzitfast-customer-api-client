import Dependencies from "typedi";
import { observable, action } from "mobx";
import { BookingSummaryStore } from "./BookingSummaryStore";


export class BookingStore
{
	@observable CurrentBooking: any = new BookingSummaryStore;

	@action Create(service?: any)
	{
		if (service)
		{
			this.BookService(service);
		}
		else
		{
			let routes = Dependencies.of("store").get<any>("routes");
				routes.Go("/booking/create/services");
		}
	}

	@action BookService(service: any)
	{
		this.CurrentBooking = new BookingSummaryStore(true);

		this.CurrentBooking.Service.Id = service.Id;
		this.CurrentBooking.Service.Name = service.Name;

		this.CurrentBooking.Store();

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/location");

		// set current booking service
	}
	@action SetBookingLocation(location: any)
	{
		this.CurrentBooking.Location.Line1 = "123 Fake Street";
		this.CurrentBooking.Location.Town = "Fatown";
		this.CurrentBooking.Location.County = "Facounty";
		this.CurrentBooking.Location.Postcode = "FA1 K3E";

		this.CurrentBooking.Store();

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/details");
	}

	@action SetBookingDetails(type: string, description: string, files: string[] = [])
	{
		this.CurrentBooking.Details.Type = type;
		this.CurrentBooking.Details.Desciption = description;
		this.CurrentBooking.Details.Files = files;

		this.CurrentBooking.Store();

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/contact");
            
	}

	@action SetBookingContactDetails(name: string, phonenumber: string, email: string[] = [])
	{
		this.CurrentBooking.ContactDetails.Name = name;
		this.CurrentBooking.ContactDetails.PhoneNumber = phonenumber;
		this.CurrentBooking.ContactDetails.Email = email;

		this.CurrentBooking.Store();

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/times");  
	}
	@action SetTimeDetails(day: string, hourBlock: string, agree: boolean)
	{
		this.CurrentBooking.Time.Day = day;
		this.CurrentBooking.Time.HourBlock = hourBlock;
		this.CurrentBooking.Time.Agree = agree;

		this.CurrentBooking.Store();

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/paymentdetails");  
	}

	@action SetPaymentCard(cardId: string, type: string, name: string, cardNumber: string, expiry: string, ccv: string)
	{
		this.CurrentBooking.Store();

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/payment");

		return true;
	}


	

	private async GetCurrentPosition(): Promise<any> {
		if ('geolocation' in navigator)
		{
			return new Promise(function(resolve, reject) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
		}
		else
		{
			throw new Error("Location service is not available.");
		}
	}

	public async FindUserAddress(): Promise<any>
	{
		let position = {
			latitude: 0,
			longitude: 0
		};

		try
		{
			let location = await this.GetCurrentPosition();
			position = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			};
		}
		catch (exception)
		{
			throw new Error("Permission was denied to use location services. You will need to refresh the page to try again.");
		}

		try
		{
			let locationStore = Dependencies.of("fixzitfast-customer-data-store").get<any>("location");
			let postcode = await locationStore.GetPostcodeFromLocation(position.latitude, position.longitude);

			return postcode;
		}
		catch (exception)
		{
			throw new Error("No postcode found for your location.");
		}
	}
}