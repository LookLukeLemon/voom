import { formatDistanceToNow } from 'date-fns';
import locale from 'date-fns/locale/ko';

export const formatDistanceToNowStrictForKorea = (date: number) => {
  return formatDistanceToNow(date, { addSuffix: true, locale: { ...locale } });
};

export const formatByThousandComma = (number: number, fractionDigits = 2) => {
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(number);
};

export const formatByThousandCommaWithSeperateFraction = (
  number: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
) => {
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(number);
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
};

export const formatAbbreviated = (
  number: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number);
};

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export const cutNumber = (number: number, maxDecimals = 2, maxLength = 15) => {
  if (number.toString().indexOf('.') === -1) {
    return +number.toString().slice(0, maxLength);
  } else {
    const decimalLimitedNumber = +number
      .toString()
      .slice(0, number.toString().indexOf('.') + (maxDecimals + 1));

    return +decimalLimitedNumber.toString().slice(0, maxLength);
  }
};

export const toFlooredAt = (sourceNumber: number, at: number) => {
  const temp1 = sourceNumber * Math.pow(10, at);
  const temp2 = Math.floor(temp1);
  return temp2 / Math.pow(10, at);
};

export const truncateMiddle = (
  source: string,
  sliceStart = 10,
  sliceEnd = 10,
  dots = 3,
) => {
  if (!source) return '';

  try {
    const result = `${source.slice(0, sliceStart)}
        ${Array(dots)
          .fill('.')
          .reduce((prev, cur) => {
            return prev + cur;
          }, '')}
            ${source.slice(-sliceEnd)}`;

    return result;
  } catch (err) {
    return '';
  }
};
