export default function formatDateToReadable(date) {
  const dbDate = new Date(date);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${
    monthNames[dbDate.getMonth()]
  } ${dbDate.getDate()} ${dbDate.getFullYear()}`;
  return formattedDate;
}
