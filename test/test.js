const expect = require('chai').expect;
const babysitter = require('../index');

describe('Babysitter', () => {
    describe('Start Time', () => {
	it('should only allow start time to be after 5:00PM', () => {
	    let startDate = new Date('March 31, 2017 16:00:00');
	    expect(babysitter.calculateCharge(startDate)).to.equal('Error: Start date must be at or after 5:00PM.');
	});

	it('should accept a valid start time', () => {
	    let startDate = new Date('March 31, 2017 17:00:00');
	    expect(babysitter.calculateCharge(startDate)).to.equal(true);
	});
    });

    describe('End Time', () => {
	it('should accept an end time', () => {
	    let startDate = new Date('March 31, 2017 17:00:00');
	    let endDate = new Date('March 31, 2017 21:00:00');
	    expect(babysitter.calculateCharge(startDate, endDate)).to.equal(true);
	});
    });
});
