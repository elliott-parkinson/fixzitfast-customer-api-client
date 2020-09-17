export interface IPaymentHandler
{
	AddCardDetails(userId: number, bookingId: number, cardNumber: string, cardName: string, cardExpiry: string, cvc: string): Promise<void>;
	UpdateCardDetails(userId: number, bookingId: number, cardNumber: string, cardName: string, cardExpiry: string, cvc: string): Promise<void>;
	ProcessPayment(userId: number, bookingId: number, cardNumber: string, cardName: string, cardExpiry: string, cvc: string): Promise<void>;
}