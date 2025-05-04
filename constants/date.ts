export const formatDate = (date: string | null) => {
	if (!date) return "";
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(date).toLocaleDateString("en-US", options);
};
