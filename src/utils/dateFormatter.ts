export const parseAsLocalDate = (dateStr: string | number | Date) => {

  
  // Create a new Date object from the string
  const date = new Date(dateStr);

  // Check if the date object is valid
  if (isNaN(date.getTime())) {
    return new Date(NaN); // Return an invalid date object
  }

  // Adjust for the time zone offset to get the correct local date
  const timeZoneOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  date.setTime(date.getTime() + timeZoneOffsetInMs);

  return date;
};
