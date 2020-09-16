import {
	Api as RestApi
} from "../rest";


export const apiClientAuthenticated = new RestApi("https://api.smartworkx.co.uk/public/api");
export const apiClient = new RestApi("https://api.smartworkx.co.uk/public/api");

export const testData =
{
	user: "majora31@gmail.com",
	password: "testpassword"
};