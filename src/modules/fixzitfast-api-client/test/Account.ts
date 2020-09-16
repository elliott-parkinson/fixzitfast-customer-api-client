import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient, apiClientAuthenticated, testData } from "./config";
import { generalChecks } from "./util";

describe('Account', () =>
{
    
    let loggedInUserId = -1;

    it('should create a new test user', async () =>
    {
        let result = await apiClient.Account.Signup(
            "Test User",
            testData.user,
            testData.password,
            "079585857347"
        );

        // generalChecks(result);
        // expect(result.Data.id, "Account signup should return an account id.").to.not.be.undefined;
        // expect(result.Data.id, "An account id should be a number.").to.be.a('number');
    });

    it('should login with the test user', async () =>
    {
        let result = await apiClient.Account.Login(
            testData.user,
            testData.password,
        );

        generalChecks(result);

        expect(result.Data.id, "Account signup should return an account id.").to.not.be.undefined;
        expect(result.Data.id, "An account id should be a number.").to.be.a('number');
    });

    
    before('Login:', async () =>
    {
        let result = await apiClientAuthenticated.Account.Login(
            testData.user,
            testData.password,
        );

        generalChecks(result);

        loggedInUserId = result.Data.id;
    });
    it('should fail to get test user details if not logged in', async () =>
    {
        let result = await apiClient.Account.GetUserDetails(1);

        generalChecks(result, false);
    });
    it('should fail to get user details for a user not logged in', async () =>
    {
        let result = await apiClientAuthenticated.Account.GetUserDetails(1);

        generalChecks(result, false);
    });
    it('should fail to get user details for a user that doesnt exist', async () =>
    {
        let result = await apiClientAuthenticated.Account.GetUserDetails(-999);

        generalChecks(result, false);
    });
    it('should get test user details', async () =>
    {
        let result = await apiClientAuthenticated.Account.GetUserDetails(loggedInUserId);
        generalChecks(result);

        expect(result.Data.accountDetails, "Account details object should be present.").to.not.be.undefined;

        expect(result.Data.accountDetails.id, "Account details should have a id.").to.not.be.undefined;
        expect(result.Data.accountDetails.id, "An id should be a number.").to.be.a('number');
        
        expect(result.Data.accountDetails.name, "Account details should have a name.").to.not.be.undefined;
        expect(result.Data.accountDetails.name, "A name should be a string.").to.be.a('string');
        
        expect(result.Data.accountDetails.email, "Account details should have a email.").to.not.be.undefined;
        expect(result.Data.accountDetails.email, "A email should be a string.").to.be.a('string');
    });
});
