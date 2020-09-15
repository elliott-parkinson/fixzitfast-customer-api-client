# API Reference Documentation

## Contact
### SubmitForm

```ts
SubmitForm(name: string, email: string, phone: string, message: string, acceptTerms?: boolean): Promise<SubmitForm.Response>
```

#### Example
```ts
import {
	Api as RestApi
} from "fixzitfast-customer-api-client/rest";


export const apiClient = new RestApi("https://api.smartworkx.co.uk/public/api");
let result = await apiClient.Contact.SubmitForm("Test Person", "test@test.com", "07969685858", "This is a test submission");

if (result.Success == true)
{

}
```