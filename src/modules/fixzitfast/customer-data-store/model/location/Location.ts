import Dependencies from "typedi";
import { observable, action } from "mobx";
import stub from "../../../customer-store/data/Addresses";

// EH postcodes only
// sorry we are not in your area right now, please come back another time

export class StoredLocation
{
	Line1: string;
	Line2: string;
	Town: string;
	Postcode: string;

	constructor(json: any) { Object.assign(this, json); }
}

export class StoredPostcode
{
	Postcode: string;

	Latitude: number;
	Longitude: number;

	ToJSON()
	{
		return JSON.stringify(this);
	}

	FromJSON(json: any)
	{
		Object.assign(this, json);
	}
}

function replacer(key, value)
{
	const originalObject = this[key];
	if (originalObject instanceof Map)
	{
		return {
			dataType: 'Map',
			value: Array.from(originalObject.entries()),
		};
	}

	return value;
}
function reviver(key, value)
{
	if (typeof value === 'object' && value !== null)
	{
		if (value.dataType === 'Map')
		{
			return new Map(value.value);
		}
	}

	return value;
}


export class Location
{
    private LastUpdated: Date;

	private Addresses: Map<string, StoredLocation[]> = new Map<string, StoredLocation[]>();
	private PostCodes: StoredPostcode[] = [];


	constructor()
	{
		this.Load();
	}

	Store()
	{
		let storage = window.localStorage;
		
		let addresses = this.Addresses;
		storage.setItem('fixzitfast.location.addresses', JSON.stringify(addresses, replacer));
		
		let postcodes = this.PostCodes.map( item => item.ToJSON() );
		storage.setItem('fixzitfast.location.postcodes', JSON.stringify(postcodes));
	}

	Update()
	{
		this.Store();
	}

	Load()
	{
		let storage = window.localStorage;
		let addresses = storage.getItem('fixzitfast.location.addresses');
		if (addresses != undefined)
		{
			this.Addresses = JSON.parse(addresses, reviver);
		}

		let postcodes = storage.getItem('fixzitfast.location.postcodes');
		if (postcodes != undefined)
		{
			let items = JSON.parse(postcodes);
			
			this.PostCodes = items.map( item => {
				let postcode = new StoredPostcode;
				postcode.FromJSON(item);

				return postcode;
			});
		}
	}


	async FetchAddressesFromPostcode(postcode: string)
	{
		postcode = postcode.replace(" ", "");
		if (stub[postcode] !== -1)
		{
			this.Addresses.set(postcode, stub[postcode]);
			this.Store();
			
			return stub[postcode];
		}
		
		return [];
	}
	async GetAddressesFromPostcode(postcode: string, force: boolean = false): Promise<StoredLocation[]>
	{
		postcode = postcode.replace(" ", "");
		if (this.Addresses.has(postcode))
		{
			return this.Addresses.get(postcode);
		}

		return await this.FetchAddressesFromPostcode(postcode);
	}
	async FetchPostcodeFromLocation(latitude: number, longitude: number)
	{
		let postcode = new StoredPostcode;
		postcode.FromJSON({
			Latitude: latitude,
			Logitude: longitude,
			Postcode: "EH14 1UT"
		});

		let search = this.PostCodes.find(postcode => 
			postcode.Latitude == latitude && postcode.Longitude == longitude	
		);

		if (search === undefined)
		{
			this.PostCodes.push(postcode);
		}
		
		return postcode.Postcode;
	}
	async GetPostcodeFromLocation(latitude: number, longitude: number, force: boolean = false): Promise<string>
	{
		let search = this.PostCodes.find(postcode => 
			postcode.Latitude == latitude && postcode.Longitude == longitude	
		);

		if (search !== undefined)
		{
			return search.Postcode;
		}

		return await this.FetchPostcodeFromLocation(latitude, longitude);
    }
    
    private async GetCurrentPosition(): Promise<any>
    {
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
			let postcode = await this.GetPostcodeFromLocation(position.latitude, position.longitude);

			return postcode;
		}
		catch (exception)
		{
			throw new Error("No postcode found for your location.");
		}
	}
}