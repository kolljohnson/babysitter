
let calculateCharge = (startTime, endTime, bedTime) => {
    if(startTime.getHours() <= 16) {
	return 'Error: Start time must be at or after 5:00PM.';
    } else if(isEndTimeValid(endTime)){
	return 'Error: End time must be at or before 4:00AM.';
    } else {
	return 0;
    }
}

let isEndTimeValid = (endTime) => {
    return endTime.getHours() > 4 && endTime.getHours() < 17;
}

module.exports = {
    calculateCharge: calculateCharge
};
