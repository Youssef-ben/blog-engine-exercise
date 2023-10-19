export const DEFAULT_LANGUAGE = 'en';

export const API_URL: string = import.meta.env.VITE_BASE_URL;

export const convertDateToString = (date: Date) => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const convertStringToDate = (date: string) => {
  if (!date) {
    return new Date();
  }

  return new Date(date.replace('-', '/'));
};
