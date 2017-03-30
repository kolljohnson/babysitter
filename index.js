
function calculateCharge (startTime) {
    if(+startTime.slice(0, 1) <= 4) {
	return 'Error: Start date must be after 5:00PM';
    }
}

module.exports = {
    calculateCharge: calculateCharge
};
