const getHours = (inSec: number): number => {
  return Math.floor(inSec / 3600);
};

const getMinutes = (inSec: number): number => {
  return Math.floor(inSec / 60);
};

const beautifyNumber = (num: number): string => {
  if (num > 9) {
    return `${num}`;
  }
  return `0${num}`;
};

const beautifyTime = (inSec: number): string => {
  let beautified = '';

  const hours = getHours(inSec);
  if (hours >= 1) {
    inSec = inSec - hours * 3600;

    beautified = `${beautifyNumber(hours)}:`;
  }

  const minutes = getMinutes(inSec);
  if (minutes >= 1) {
    inSec = inSec - minutes * 60;
  }

  return `${beautified}${beautifyNumber(minutes)}:${beautifyNumber(
    Math.round(inSec),
  )}`;
};

export default beautifyTime;
