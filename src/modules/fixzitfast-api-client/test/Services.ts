import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient } from "./config";
import { generalChecks } from "./util";



describe('fixzitfast-customer-api/Services', () =>
{
    it('should list all services', async () =>
    {
        let result = await apiClient.Services.List();
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        expect(result.Data.services[0].serviceId, "A service should have a serviceId.").to.not.be.undefined;
        expect(result.Data.services[0].serviceId, "A serviceId should be a number.").to.be.a('number');
        
        expect(result.Data.services[0].name, "A service should have a name.").to.not.be.undefined;
        expect(result.Data.services[0].name, "A name should be a string.").to.be.a('string');
    });

    it('should list featured services', async () =>
    {
        let result = await apiClient.Services.ListFeatured();
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        expect(result.Data.services[0].serviceId, "A service should have a serviceId.").to.not.be.undefined;
        expect(result.Data.services[0].serviceId, "A serviceId should be a number.").to.be.a('number');
        
        expect(result.Data.services[0].name, "A service should have a name.").to.not.be.undefined;
        expect(result.Data.services[0].name, "A name should be a string.").to.be.a('string');
    });

    it('should return results when searching for "plumbing"', async () =>
    {
        let result = await apiClient.Services.Search("plumbing");
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        expect(result.Data.services[0].serviceId, "A service should have a serviceId.").to.not.be.undefined;
        expect(result.Data.services[0].serviceId, "A serviceId should be a number.").to.be.a('number');
        
        expect(result.Data.services[0].name, "A service should have a name.").to.not.be.undefined;
        expect(result.Data.services[0].name, "A name should be a string.").to.be.a('string');

        expect(result.Data.services[0].name, "The service name should have 'plumbing' in it and be related to the search term.").to.include("plumbing");
    });

    it('should return results when searching for services for the category 2', async () =>
    {
        let result = await apiClient.Services.ListByCategory(2);
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        expect(result.Data.services[0].serviceId, "A service should have a serviceId.").to.not.be.undefined;
        expect(result.Data.services[0].serviceId, "A serviceId should be a number.").to.be.a('number');
        
        expect(result.Data.services[0].name, "A service should have a name.").to.not.be.undefined;
        expect(result.Data.services[0].name, "A name should be a string.").to.be.a('string');

        expect(result.Data.services[0].parentId, "A service should have a parentId.").to.not.be.undefined;
        expect(result.Data.services[0].parentId, "A parentId should be a number.").to.be.a('number');

        expect(result.Data.services[0].parentId, "The service parentId should be 2 as that's what was searched for.").to.equal(2);
    });

    it('should return hourly costs for the category 2', async () =>
    {
        let result = await apiClient.Services.GetHourlyCosts(2);
        generalChecks(result);

        expect(result.Data.services, "The 'services' array should be in the response.").to.not.be.undefined;
        expect(result.Data.services.length, "The 'services' array should not be empty.").to.be.above(0);

        expect(result.Data.services[0].serviceId, "A service should have a serviceId.").to.not.be.undefined;
        expect(result.Data.services[0].serviceId, "A serviceId should be a number.").to.be.a('number');
        
        expect(result.Data.services[0].name, "A service should have a name.").to.not.be.undefined;
        expect(result.Data.services[0].name, "A name should be a string.").to.be.a('string');

        expect(result.Data.services[0].cost, "A service should have a cost.").to.not.be.undefined;
        expect(result.Data.services[0].cost, "A cost should be a number.").to.be.a('number');
    });
});
