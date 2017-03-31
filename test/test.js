const expect = require('chai').expect;
const babysitter = require('../index');

describe('Babysitter', () => {
    it('should only allow start time to be after 5:00PM', () => {
	let startDate = new Date('March 31, 2017 16:00:00');
	expect(babysitter.calculateCharge(startDate)).to.equal('Error: Start date must be at or after 5:00PM.');
    });
});
