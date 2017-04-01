
let calculateCharge = (startTime, endTime, bedTime) => {
    if(startTime.getHours() <= 16) {
	return 'Error: Start time must be at or after 5:00PM.';
    } else if(isEndTimeValid(endTime)){
	return 'Error: End time must be at or before 4:00AM.';
    } else {
	let bedTimeRate = bedTime.getHours() - startTime.getHours();
	if(isEndTimeAfterBedtime(endTime, bedTime)) {
	    if(endTime.getHours() === 0) {
		let midnightRate = 24 - bedTime.getHours();
		return bedTimeRate * 12 + midnightRate * 8;
	    }
	    let midnightRate = endTime.getHours() - bedTime.getHours();
	    return bedTimeRate * 12 + midnightRate * 8;
	} else {
	    return bedTimeRate * 12;
	}
    }
}

let isEndTimeValid = (endTime) => {
    return endTime.getHours() > 4 && endTime.getHours() < 17;
}

let isEndTimeAfterBedtime = (endTime, bedTime) => {
    return (endTime.getHours() > bedTime.getHours()) || (endTime.getHours() === 0);
}

module.exports = {
    calculateCharge: calculateCharge
};
