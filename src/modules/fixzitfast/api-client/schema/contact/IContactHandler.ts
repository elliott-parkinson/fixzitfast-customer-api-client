import { SubmitForm } from "./SubmitContactForm";

export interface IContactHandler
{
	SubmitForm(name: string, email: string, phone: string, message: string, acceptTerms?: boolean): Promise<SubmitForm.Response>
}