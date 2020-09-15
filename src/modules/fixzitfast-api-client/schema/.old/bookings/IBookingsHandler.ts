export interface IBookingsHandler
{
	UpdateContactDetails(id: any, name: string, phone: string, email: string, createAccount: boolean, agreeDetailsProcessing: boolean): Promise<void>;
	UpdateLocationDetails(id: any, street: string, district: string, town: string, county: string, postcode: string): Promise<void>;
	
	New(temporaryId: any, serviceId: any, serviceGroupId: any, description: string): Promise<void>;
	AttachImages(id: any, images: string[]): Promise<void>;
	Availability(id: any, day: Date): Promise<void>;
	CostsBreakdown(id: any): Promise<void>;
	Confirm(id: any): Promise<void>;

	Details(id: any): Promise<void>;
	List(): Promise<void>;
	ListArchived(): Promise<void>;
}