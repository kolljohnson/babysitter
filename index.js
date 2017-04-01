
let calculateCharge = (startTime, endTime, bedtime) => {
    let error = isInvalidInput(startTime, endTime, bedtime);
    if(error) return error;
    
    let bedtimeRate = bedtime.getHours() - startTime.getHours();
    if(isEndTimeAfterBedtime(endTime, bedtime)) {
	return calculateAfterBedtime(endTime, bedtime, bedtimeRate);
    } else {
	return bedtimeRate * 12;
    }
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

let calculateAfterBedtime = (endTime, bedtime, bedtimeRate) => {
    if(isAtOrAfterMidnight(endTime)) {
	let midnightRate = 24 - bedtime.getHours();
	if(isAfterMidnight(endTime)) {
	    let afterMidnightRate = endTime.getHours() * 16;
	    return bedtimeRate * 12 + midnightRate * 8 + afterMidnightRate;
	}
	return bedtimeRate * 12 + midnightRate * 8;
    }
    let midnightRate = endTime.getHours() - bedtime.getHours();
    return bedtimeRate * 12 + midnightRate * 8;
}

module.exports = {
    calculateCharge: calculateCharge
};
