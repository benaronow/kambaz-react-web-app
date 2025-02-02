export const genDate = (daysAgo: number) => {
  const today = new Date();
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date;
};

export const getDaysAgo = (date: Date) => {
  const today = new Date();
  const targetDate = new Date(date);
  const timeDifference = today.getTime() - targetDate.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};
