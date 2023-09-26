export function formatDate(date) {
	return Intl.DateTimeFormat("da-DK", {
		day: "numeric",
		weekday: "short",
		month: "long",
		year: "numeric"
	}).format(date);
}