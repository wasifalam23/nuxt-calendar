import moment from "moment";

const formatDate = (inputDateString) => {
	// Parse the input date string using Moment.js
	const momentDate = moment(
		inputDateString,
		"ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
	);

	// Format the date to "YYYY-MM-DD"
	const formattedDateString = momentDate.format("YYYY-MM-DD");

	return formattedDateString;
};

export default formatDate;
