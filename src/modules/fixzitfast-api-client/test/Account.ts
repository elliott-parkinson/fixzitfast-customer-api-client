import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient } from "./config";
import { generalChecks } from "./util";

describe('fixzitfast-customer-api/Account', () =>
{
    it('should create a new test user', async () =>
    {
        let result = await apiClient.Account.Signup(
            "Test User",
            "majora31@gmail.com",
            "testpassword",
            "079585857347"
        );

        generalChecks(result);

        expect(result.Data.id, "Account signup should return an account id.").to.not.be.undefined;
        expect(result.Data.id, "An account id should be a number.").to.be.a('number');
    });


    before('Database: connect', async () =>
    {
        // await wordpress.Connect();
        // expect(wordpress.IsConnected()).to.equal(true);
    });

    after('should disconnect from the database', async () =>
    {
        // await wordpress.Disconnect();
        // expect(wordpress.IsConnected()).to.equal(false);
    });
});
