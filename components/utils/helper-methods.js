function CalculateDate(date) {
	const dateString = date;
	const postDate = new Date(dateString);
	const currentDate = new Date();

	const timeDifference = currentDate - postDate;

	const milliseconds = timeDifference;
	const seconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const remainingHours = hours % 24;
	const remainingMinutes = minutes % 60;
	const remainingSeconds = seconds % 60;

	let timeAgo = "";
	if (days) {
		timeAgo = days + (days === 1 ? " day" : " days") + " ago";
	} else if (hours) {
		timeAgo = remainingHours + (hours === 1 ? " hour" : " hours") + " ago";
	} else if (minutes) {
		timeAgo =
			remainingMinutes + (minutes === 1 ? " minute" : " minutes") + " ago";
	} else {
		timeAgo =
			remainingSeconds + (seconds === 1 ? " second" : " seconds") + " ago";
	}
	return timeAgo;
}

export default CalculateDate;