import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient, apiClientAuthenticated, testData } from "./config";
import { generalChecks } from "./util";

describe('Engineer', () =>
{
    before('Login:', async () =>
    {
        let result = await apiClientAuthenticated.Account.Login(
            testData.user,
            testData.password,
        );

        generalChecks(result);
    });


    it('should list all engineers', async () =>
    {
        let result = await apiClient.Engineer.List();
        generalChecks(result);

        expect(result.Data.engineers, "The 'engineers' array should be in the response.").to.not.be.undefined;
        expect(result.Data.engineers.length, "The 'engineers' array should not be empty.").to.be.above(0);

        expect(result.Data.engineers[0].categoryId, "An engineer should have a categoryId.").to.not.be.undefined;
        expect(result.Data.engineers[0].categoryId, "An categoryId should be a number.").to.be.a('number');
        
        expect(result.Data.engineers[0].name, "An engineer should have a name.").to.not.be.undefined;
        expect(result.Data.engineers[0].categoryName, "A categoryName should be a string.").to.be.a('string');
        
        expect(result.Data.engineers[0].categoryName, "An engineer should have a categoryName.").to.not.be.undefined;
        expect(result.Data.engineers[0].categoryName, "An categoryName should be a string.").to.be.a('string');
    });

    it('should list available engineers', async () =>
    {
        let result = await apiClient.Engineer.ListAvailable("21/11/2020", "10:00", "14:00");
        generalChecks(result);

        expect(result.Data.engineers, "The 'engineers' array should be in the response.").to.not.be.undefined;
        expect(result.Data.engineers.length, "The 'engineers' array should not be empty.").to.be.above(0);

        expect(result.Data.engineers[0].categoryId, "An engineer should have a categoryId.").to.not.be.undefined;
        expect(result.Data.engineers[0].categoryId, "An categoryId should be a number.").to.be.a('number');
        
        expect(result.Data.engineers[0].categoryName, "An engineer should have a categoryName.").to.not.be.undefined;
        expect(result.Data.engineers[0].categoryName, "An categoryName should be a string.").to.be.a('string');
    });
});
