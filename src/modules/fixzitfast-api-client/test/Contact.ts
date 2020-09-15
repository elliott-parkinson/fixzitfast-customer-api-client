import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient } from "./config";
import { generalChecks } from "./util";


describe('fixzitfast-customer-api/Contact', () =>
{
    it('should submit the contact form without error', async () =>
    {
        let result = await apiClient.Contact.SubmitForm("Test Person", "test@test.com", "07969685858", "This is a test submission");
        generalChecks(result);
    });
});
