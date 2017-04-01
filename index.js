
let calculateCharge = (startTime, endTime, bedtime) => {
    let error = isInvalidInput(startTime, endTime, bedtime);
    if(error) return error;

    return calculateBedtime(startTime, endTime, bedtime);
}

let isAtOrAfterMidnight = (endTime) => {
    return endTime.getHours() < 4 && endTime.getHours() >= 0;
}

let isAfterMidnight = (endTime) => {
    return endTime.getHours() < 4 && endTime.getHours() > 0; 
}

let isEndTimeValid = (endTime) => {
    return endTime.getHours() > 4 && endTime.getHours() < 17;
}

let isEndTimeAfterBedtime = (endTime, bedtime) => {
    return (endTime.getHours() > bedtime.getHours()) || isAtOrAfterMidnight(endTime);
}

let isInvalidInput = (startTime, endTime, bedtime) => {
    if(startTime.getHours() <= 16) {
	return 'Error: Start time must be at or after 5:00PM.';
    } else if(isEndTimeValid(endTime)){
	return 'Error: End time must be at or before 4:00AM.';
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
	return calculateMidnightRate(endTime, bedtime, bedtimeRate);
    } 
    let midnightRate = endTime.getHours() - bedtime.getHours();
    return bedtimeRate * 12 + midnightRate * 8;
}

let calculateMidnightRate = (endTime, bedtime, bedtimeRate) => {
    let midnightRate = 24 - bedtime.getHours();
    if(isAfterMidnight(endTime)) {
	return calculateAfterMidnightRate(endTime, bedtimeRate, midnightRate);
    }
    return bedtimeRate * 12 + midnightRate * 8;    
}

let calculateAfterMidnightRate = (endTime, bedtimeRate, midnightRate) => {
    let afterMidnightRate = endTime.getHours() * 16;
    return bedtimeRate * 12 + midnightRate * 8 + afterMidnightRate;
}

module.exports = {
    calculateCharge: calculateCharge
};
