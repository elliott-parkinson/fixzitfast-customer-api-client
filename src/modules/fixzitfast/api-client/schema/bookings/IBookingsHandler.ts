export interface IBookingsHandler
{
	Create(): Promise<void>;

	SetLocation(id: any, line1: string, line2: string, line3: string, town: string, county: string, postcode: string): Promise<void>;
	SetService(id: any, serviceId: number): Promise<void>;

	SetTimeslot(id: any, date: string, startTime: string, finishTime: string): Promise<void>;
	SetDetails(id: any, repairType: string, details: string, file: string): Promise<void>;
	Complete(id: any, name: string, email: string, password: string): Promise<void>;

	GetUpcoming(): Promise<void>;
}