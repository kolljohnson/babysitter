const expect = require('chai').expect;
const babysitter = require('../index');

describe('Babysitter', () => {
    describe('Start Time', () => {
	let endTime = new Date('March 31, 2017 21:00:00');
	it('should only allow start time to be after 5:00PM', () => {
	    let startTime = new Date('March 31, 2017 16:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal('Error: Start date must be at or after 5:00PM.');
	});

	it('should accept a valid start time', () => {
	    let startTime = new Date('March 31, 2017 17:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal(true);
	});
    });

    describe('End Time', () => {
	it('should accept an end time', () => {
	    let startTime = new Date('March 31, 2017 17:00:00');
	    let endTime = new Date('March 31, 2017 21:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal(true);
	});

	it('should only allow end time to be before or at 4:00AM', () => {
	    let startTime = new Date('March 31, 2017 17:00:00');
	    let endTime = new Date('March 31, 2017 05:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal('Error: End time must be at or before 4:00AM.');
	});
    });
});
