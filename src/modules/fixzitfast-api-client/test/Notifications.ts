import 'mocha';
import { expect } from 'chai';
import { step } from 'mocha-steps';

import { apiClient } from "./config";
import { generalChecks } from "./util";

describe('fixzitfast-customer-api/Notifications', () =>
{
    /* it('should error if not logged in when getting notifications', async () =>
    {
        let result = await apiClient.Notifications.List(1);
        generalChecks(result, false);
    }); */

    it('should list all notifications', async () =>
    {
        let result = await apiClient.Notifications.List(2);
        generalChecks(result);

        expect(result.Data.notifications, "The 'notifications' array should be in the response.").to.not.be.undefined;
        expect(result.Data.notifications.length, "The 'notifications' array should not be empty.").to.be.above(0);

        expect(result.Data.notifications[0].engineerId, "An engineer should have a engineerId.").to.not.be.undefined;
        expect(result.Data.notifications[0].engineerId, "An engineerId should be a number.").to.be.a('number');
        
        expect(result.Data.services[0].name, "A service should have a name.").to.not.be.undefined;
        expect(result.Data.services[0].name, "A name should be a string.").to.be.a('string');
        
        expect(result.Data.notifications[0].name, "An engineer should have a name.").to.not.be.undefined;
        expect(result.Data.notifications[0].name, "An name should be a string.").to.be.a('string');
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
