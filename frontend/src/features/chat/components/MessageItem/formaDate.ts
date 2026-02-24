import dayjs from 'dayjs';

export const formatDateTime = (datetime: string): string => {
  const date = new Date();
  const day = date.getDate();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  if (day > new Date(datetime).getDate()) {
    return "Вчера, " + dayjs(datetime).format('HH:mm');
  }
  if (currentYear > new Date(datetime).getFullYear()) {
    return "Год назад, " + dayjs(datetime).format('DD.MM.YYYY HH:mm');
  }
  if (currentMonth > new Date(datetime).getMonth()) {
    return "Месяц назад, " + dayjs(datetime).format('DD.MM.YYYY HH:mm');
  }

  return dayjs(datetime).format('DD.MM.YYYY HH:mm');
};
