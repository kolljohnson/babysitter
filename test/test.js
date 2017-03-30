const expect = require('chai').expect();
const babysitter = require('../index');

describe('Babysitter', () => {
    it('should only allow start time to be after 5:00PM', () => {
	expect(babysitter.calculateCharge('4:00 PM')).to.equal('Error: Start date must be at or after 5:00PM.');
    });
});
