
function calculateCharge (startTime, endTime) {
    if(startTime.getHours() <= 16) {
	return 'Error: Start date must be at or after 5:00PM.';
    } else if(endTime.getHours() > 4 && endTime.getHours() < 17){
	return 'Error: End time must be at or before 4:00AM.';
    } else {
	return true;
    }
}

module.exports = {
    calculateCharge: calculateCharge
};
