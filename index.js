
function calculateCharge (startTime) {
    if(startTime.getHours() <= 16) {
	return 'Error: Start date must be at or after 5:00PM.';
    }
}

module.exports = {
    calculateCharge: calculateCharge
};
