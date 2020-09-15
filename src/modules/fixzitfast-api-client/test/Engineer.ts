import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient } from "./config";
import { generalChecks } from "./util";

describe('fixzitfast-customer-api/Engineer', () =>
{
    it('should list all engineers', async () =>
    {
        let result = await apiClient.Engineer.List();
        generalChecks(result);

        expect(result.Data.engineers, "The 'engineers' array should be in the response.").to.not.be.undefined;
        expect(result.Data.engineers.length, "The 'engineers' array should not be empty.").to.be.above(0);

        expect(result.Data.engineers[0].engineerId, "An engineer should have a engineerId.").to.not.be.undefined;
        expect(result.Data.engineers[0].engineerId, "An engineerId should be a number.").to.be.a('number');
        
        expect(result.Data.engineers[0].name, "An engineer should have a name.").to.not.be.undefined;
        expect(result.Data.engineers[0].name, "A name should be a string.").to.be.a('string');
        
        expect(result.Data.engineers[0].name, "An engineer should have a name.").to.not.be.undefined;
        expect(result.Data.engineers[0].name, "An name should be a string.").to.be.a('string');
    });

    it('should list available engineers', async () =>
    {
        let result = await apiClient.Engineer.ListAvailable("21/11/2020", "10:00", "14:00");
        generalChecks(result);

        expect(result.Data.engineers, "The 'engineers' array should be in the response.").to.not.be.undefined;
        expect(result.Data.engineers.length, "The 'engineers' array should not be empty.").to.be.above(0);

        expect(result.Data.engineers[0].engineerId, "An engineer should have a engineerId.").to.not.be.undefined;
        expect(result.Data.engineers[0].engineerId, "An engineerId should be a number.").to.be.a('number');
        
        expect(result.Data.engineers[0].name, "An engineer should have a name.").to.not.be.undefined;
        expect(result.Data.engineers[0].name, "An name should be a string.").to.be.a('string');
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
