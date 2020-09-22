import Dependencies from "typedi";
import { observable, action } from "mobx";
import { BookingSummaryStore } from "./BookingSummaryStore";


export class BookingStore
{
	@observable CurrentBooking: any;

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
		this.CurrentBooking = new BookingSummaryStore;

		this.CurrentBooking.ServiceId = service.Id;
		this.CurrentBooking.ServiceName = service.Name;

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/location");

		// set current booking service
	}
	@action SetBookingLocation(location: any)
	{
		this.CurrentBooking.LocationString = "123 Fake Street, Fatown, Facounty, FA1 K3E";

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/details");
            
		const notificationStore = Dependencies.of("store").get<any>("notifications");
		notificationStore.Push("Error: Not Implemented", "Cannot set a bookings details yet.", "danger", 2.5);
		notificationStore.Push("Warning: Data Faked", "Location data was faked as the API does not yet exist.", "warning", 2.5);
	}

	@action SetBookingDetails(type: string, description: string, files: string[] = [])
	{
		this.CurrentBooking.Details.Type = type;
		this.CurrentBooking.Details.Desciption = description;
		this.CurrentBooking.Details.File = files;

		let routes = Dependencies.of("store").get<any>("routes");
			routes.Go("/booking/create/contact");
            
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
			throw new Error("Could not obtain permission to use location service.");
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
			console.log(position);

			// let response = await axios.get<any>(this.ApiUrl + "/postcodes?lat=" + position.latitude + "&lon=" + position.longitude);
			// if (!response.data || !response.data.result || response.data.result === 0) {
				throw new Error("");
			// }

			// return response.data.result;
		}
		catch (exception)
		{
			throw new Error("No postcode found for your location.");
		}
	}
}