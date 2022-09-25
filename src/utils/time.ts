const bday = new Date('29 January 2006 00:00:00 GMT');
const ageMS = Date.now() - bday.getTime();

export const MILLISECOND = 1;
export const SECOND = MILLISECOND * 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const YEAR = DAY * 365;

export const age = ageMS / YEAR