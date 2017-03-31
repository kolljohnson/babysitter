
function calculateCharge (startTime, endTime) {
    if(startTime.getHours() <= 16) {
	return 'Error: Start date must be at or after 5:00PM.';
    } else {
	return true;
    }
}

module.exports = {
    calculateCharge: calculateCharge
};
