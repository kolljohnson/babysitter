const expect = require('chai').expect;
const babysitter = require('../index');

describe('Babysitter', () => {
    describe('Start Time', () => {

	let endTime = new Date('March 31, 2017 21:00:00');
	let bedTime = new Date('March 31, 2017 21:00:00');


	it('should only allow start time to be after 5:00PM', () => {
	    let startTime = new Date('March 31, 2017 16:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal('Error: Start time must be at or after 5:00PM.');
	});

	it('should accept a valid start time', () => {
	    let startTime = new Date('March 31, 2017 17:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal(0);
	});
    });

    describe('End Time', () => {

	let startTime = new Date('March 31, 2017 17:00:00');
	let bedTime = new Date('March 31, 2017 21:00:00');
	
	it('should accept an end time', () => {
	    let endTime = new Date('March 31, 2017 21:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal(0);
	});

	it('should only allow end time to be before or at 4:00AM', () => {
	    let endTime = new Date('March 31, 2017 05:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime)).to.equal('Error: End time must be at or before 4:00AM.');
	});
    });

    describe('BedTime', () => {
	let startTime = new Date('March 31, 2017 17:00:00');
	let endTime = new Date('March 31, 2017 21:00:00');

	it('should accept a bedtime', () => {
	    let bedTime = new Date('March 31, 2017 21:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime, bedTime)).to.equal(0);
	});
    });

    describe('Calculating Charge', () => {
	let startTime = new Date('March 31, 2017 17:00:00');

	it('should return a charge', () => {
	    let endTime = new Date('March 31, 2017 20:00:00');
	    let bedTime = new Date('March 31, 2017 21:00:00');

	    expect(babysitter.calculateCharge(startTime, endTime, bedTime)).to.equal(0);
	});

	it('should pay $12/hour from start-time to bedtime', () => {
	    let endTime = new Date('March 31, 2017 21:00:00');
	    let bedTime = new Date('March 31, 2017 21:00:00');
	    expect(babysitter.calculateCharge(startTime, endTime, bedTime)).to.equal(48);
	});
    });
});
