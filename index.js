let beforeBedtimeRate = 12;
let beforeMidnightRate = 8;
let afterMidnightRate = 16;

let calculatePay = (startTime, endTime, bedtime) => {
    let error = isInvalidInput(startTime, endTime, bedtime);
    if(error) return error;

    return calculateBeforeBedtime(startTime, endTime, bedtime);
}

let isBeforeBedtime = (endTime, bedtime) => {
    return (endTime.getHours() < bedtime.getHours()) && !isEndTimeAfterBedtime(endTime, bedtime);
}

let isAtOrAfterMidnight = (time) => {
    return time.getHours() < 4 && time.getHours() >= 0;
}

let isAfterMidnight = (time) => {
    return time.getHours() < 4 && time.getHours() > 0; 
}

let isStartTimeInvalid = (startTime) => {
    return startTime.getHours() <= 16;
}

let isEndTimeInvalid = (endTime) => {
    return endTime.getHours() > 4 && endTime.getHours() < 17;
}

let isEndTimeAfterBedtime = (endTime, bedtime) => {
    return (endTime.getHours() > bedtime.getHours()) || isAtOrAfterMidnight(endTime);
}

let isInvalidInput = (startTime, endTime, bedtime) => {
    if(isStartTimeInvalid(startTime)) {
	return 'Error: Start time must be at or after 5:00PM.';
    } else if(isEndTimeInvalid(endTime)){
	return 'Error: End time must be at or before 4:00AM.';
    } else if(isAfterMidnight(bedtime)) {
	return 'Error: bedtime must be at or before midnight.';
    }
}

let calculateBeforeBedtime = (startTime, endTime, bedtime) => {
    if (isBeforeBedtime(endTime, bedtime)) {
	return (endTime.getHours() - startTime.getHours()) * beforeBedtimeRate;
    } else {
	return calculateBedtime(startTime, endTime, bedtime);
    }
}

let calculateBedtime = (startTime, endTime, bedtime) => {
    let bedtimeTotal = bedtime.getHours() - startTime.getHours();
    if(isEndTimeAfterBedtime(endTime, bedtime)) {
	return calculateAfterBedtime(endTime, bedtime, bedtimeTotal);
    } else {
	return bedtimeTotal * beforeBedtimeRate;
    }
}

let calculateAfterBedtime = (endTime, bedtime, bedtimeTotal) => {
    if(isAtOrAfterMidnight(endTime)) {
	return calculateMidnight(endTime, bedtime, bedtimeTotal);
    } 
    let beforeMidnightTotal = endTime.getHours() - bedtime.getHours();
    return afterBedtimeTotal(bedtimeRate, beforeMidnightTotal);
}

let calculateMidnight = (endTime, bedtime, bedtimeTotal) => {
    let midnightTotal = 24 - bedtime.getHours();
    if(isAfterMidnight(endTime)) {
	return calculateAfterMidnight(endTime, bedtimeTotal, midnightTotal);
    }
    return afterBedtimeTotal(bedtimeTotal, midnightTotal);    
}

let calculateAfterMidnight = (endTime, bedtimeTotal, midnightTotal) => {
    let afterMidnightTotal = endTime.getHours() * afterMidnightRate;
    return afterBedtimeTotal(bedtimeTotal, midnightTotal) + afterMidnightTotal;
}

let afterBedtimeTotal = (bedtimeTotal, midnightTotal) => {
    return (bedtimeTotal * beforeBedtimeRate) + (midnightTotal * beforeMidnightRate);    
}

module.exports = {
    calculatePay: calculatePay
};
