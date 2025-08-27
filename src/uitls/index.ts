export const parseDate = (str: string) => {
  const [dateStr, timeStr] = str?.split(' ');

  const [hour, minute] = timeStr?.split(':').map(Number) || [0, 0];
  const [month, day, year] = dateStr?.split('.').map(Number) || [0, 0, 0];

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    console.error('Invalid date format:', str);
    return undefined;
  }

  return new Date(year, month - 1, day, hour, minute);
};

export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

export const splitJapaneseDateRangeFormat = (
  dateRange: string
): { startDate: string; endDate: string } => {
  const cleaned = dateRange.split('\n')[0].trim();
  const [startDate, endDate] = cleaned.split('〜').map((date) => date.trim());
  return {
    startDate,
    endDate,
  };
};
