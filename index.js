
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

let isEndTimeInvalid = (endTime) => {
    return endTime.getHours() > 4 && endTime.getHours() < 17;
}

let isEndTimeAfterBedtime = (endTime, bedtime) => {
    return (endTime.getHours() > bedtime.getHours()) || isAtOrAfterMidnight(endTime);
}

let isInvalidInput = (startTime, endTime, bedtime) => {
    if(startTime.getHours() <= 16) {
	return 'Error: Start time must be at or after 5:00PM.';
    } else if(isEndTimeInvalid(endTime)){
	return 'Error: End time must be at or before 4:00AM.';
    } else if(isAfterMidnight(bedtime)) {
	return 'Error: bedtime must be at or before midnight.';
    }
}

let calculateBeforeBedtime = (startTime, endTime, bedtime) => {
    if (isBeforeBedtime(endTime, bedtime)) {
	return (endTime.getHours() - startTime.getHours()) * 12;
    } else {
	return calculateBedtime(startTime, endTime, bedtime);
    }
}

let calculateBedtime = (startTime, endTime, bedtime) => {
    let bedtimeRate = bedtime.getHours() - startTime.getHours();
    if(isEndTimeAfterBedtime(endTime, bedtime)) {
	return calculateAfterBedtime(endTime, bedtime, bedtimeRate);
    } else {
	return bedtimeRate * 12;
    }
}

let calculateAfterBedtime = (endTime, bedtime, bedtimeRate) => {
    if(isAtOrAfterMidnight(endTime)) {
	return calculateMidnight(endTime, bedtime, bedtimeRate);
    } 
    let beforeMidnightRate = endTime.getHours() - bedtime.getHours();
    return afterBedtimeRate(bedtimeRate, beforeMidnightRate);
}

let calculateMidnight = (endTime, bedtime, bedtimeRate) => {
    let midnightRate = 24 - bedtime.getHours();
    if(isAfterMidnight(endTime)) {
	return calculateAfterMidnight(endTime, bedtimeRate, midnightRate);
    }
    return afterBedtimeRate(bedtimeRate, midnightRate);    
}

let calculateAfterMidnight = (endTime, bedtimeRate, midnightRate) => {
    let afterMidnightRate = endTime.getHours() * 16;
    return afterBedtimeRate(bedtimeRate, midnightRate) + afterMidnightRate;
}

let afterBedtimeRate = (bedtimeRate, midnightRate) => {
    return bedtimeRate * 12 + midnightRate * 8;    
}

module.exports = {
    calculatePay: calculatePay
};
