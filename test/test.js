const expect = require('chai').expect;
const calculatePay = require('../index').calculatePay;

describe('Babysitter', () => {
    describe('Start Time', () => {

	let endTime = new Date('March 31, 2017 21:00:00');
	let bedtime = new Date('March 31, 2017 21:00:00');


	it('should only allow start time to be after 5:00PM', () => {
	    let startTime = new Date('March 31, 2017 16:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal('Error: Start time must be at or after 5:00PM.');
	});

	it('should accept a valid start time', () => {
	    let startTime = new Date('March 31, 2017 17:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(48);
	});
    });

    describe('End Time', () => {

	let startTime = new Date('March 31, 2017 17:00:00');
	let bedtime = new Date('March 31, 2017 21:00:00');
	
	it('should accept an end time', () => {
	    let endTime = new Date('March 31, 2017 21:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(48);
	});

	it('should only allow end time to be before or at 4:00AM', () => {
	    let endTime = new Date('March 31, 2017 05:00:00');
	    expect(calculatePay(startTime, endTime)).to.equal('Error: End time must be at or before 4:00AM.');
	});
    });

    describe('BedTime', () => {
	
	let startTime = new Date('March 31, 2017 17:00:00');
	let endTime = new Date('March 31, 2017 21:00:00');

	it('should accept a bedtime', () => {
	    let bedtime = new Date('March 31, 2017 21:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(48);
	});

	it('should not allow a bedtime after 12:00AM', () => {
	    let bedtime = new Date('April 1, 2017 02:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal('Error: bedtime must be at or before midnight.');
	});
    });

    describe('Calculating Charge', () => {
	let startTime = new Date('March 31, 2017 17:00:00');
	let bedtime = new Date('March 31, 2017 21:00:00');
	
	it('should return a charge if endTime is before bedtime', () => {
	    let endTime = new Date('March 31, 2017 20:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(36);
	});

	it('should pay $12/hour from start-time to bedtime', () => {
	    let endTime = new Date('March 31, 2017 21:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(48);
	});

	it('should pay $8/hour from bedtime to midnight', () => {
	    let endTime = new Date('March 31, 2017 00:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(72);
	});

	it('should pay $16/hour after midnight till end of job', () => {
	    let endTime = new Date('March 31, 2017 02:00:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(104);
	});

	it('does not calculate fractional hours', () => {
	    let endTime = new Date('March 31, 2017 01:45:00');
	    expect(calculatePay(startTime, endTime, bedtime)).to.equal(88);
	});
    });
});
