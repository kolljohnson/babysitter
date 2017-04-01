
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

let isEndTimeValid = (endTime) => {
    return endTime.getHours() > 4 && endTime.getHours() < 17;
}

let isEndTimeAfterBedtime = (endTime, bedtime) => {
    return (endTime.getHours() > bedtime.getHours()) || (endTime.getHours() === 0);
}

let isInvalidInput = (startTime, endTime, bedtime) => {
    if(startTime.getHours() <= 16) {
	return 'Error: Start time must be at or after 5:00PM.';
    } else if(isEndTimeValid(endTime)){
	return 'Error: End time must be at or before 4:00AM.';
    }
}

let calculateAfterBedtime = (endTime, bedtime, bedtimeRate) => {
    if(endTime.getHours() === 0) {
	let midnightRate = 24 - bedtime.getHours();
	return bedtimeRate * 12 + midnightRate * 8;
    }
    let midnightRate = endTime.getHours() - bedtime.getHours();
    return bedtimeRate * 12 + midnightRate * 8;
}

module.exports = {
    calculateCharge: calculateCharge
};
