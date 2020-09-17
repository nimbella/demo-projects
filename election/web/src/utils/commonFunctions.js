import {
  INDIA_ISO_SUFFIX,
  ISO_DATE_REGEX,
  LOCALE_SHORTHANDS,
  NAN_STATISTICS,
  PER_MILLION_OPTIONS,
  STATISTIC_OPTIONS,
} from '../constants';

import {format, formatDistance} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import {store} from 'react-notifications-component';

let locale = null;
const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

const getLocale = () => {
  import('date-fns/locale/').then((localePackage) => {
    locale = localePackage[LOCALE_SHORTHANDS[window.localStorage.i18nextLng]];
  });
};

export const notify = (title, message, type) => {
  store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export const isDevelopmentOrTest = () => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
    return true;
  return false;
};

export const getUSADate = () => {
  return utcToZonedTime(new Date(), 'America/New_York');
};

export const formatLastUpdated = (unformattedDate) => {
  getLocale();
  return formatDistance(new Date(unformattedDate), new Date(), {
    locale: locale,
  });
};

export const parseUSADate = (isoDate) => {
  if (!isoDate) return getUSADate();
  return utcToZonedTime(new Date(isoDate), 'America/New_York');
};

export const getLastElectionYear = () => {
  return 2016;
};

export const getFirstElectionYear = () => {
  return 1976;
};

export const formatDate = (unformattedDate, formatString) => {
  if (!unformattedDate) return '';
  if (
    typeof unformattedDate === 'string' &&
    unformattedDate.match(ISO_DATE_REGEX)
  )
    unformattedDate += INDIA_ISO_SUFFIX;
  const date = utcToZonedTime(new Date(unformattedDate), 'America/New_york');
  return format(date, formatString, {
    locale: locale,
  });
};

export const abbreviateNumber = (number) => {
  if (Math.abs(number) < 1e3) return numberFormatter.format(number);
  let newValue = number;
  const suffixes = ['', 'k', 'm', 'b', 't'];
  const suffixNum = Math.floor(('' + number).length / 3);
  let shortValue = '';
  for (let precision = 2; precision >= 1; precision--) {
    shortValue = parseFloat(
      (suffixNum !== 0
        ? number / Math.pow(1000, suffixNum)
        : number
      ).toPrecision(precision)
    );
    const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
    if (dotLessShortValue.length <= 2) {
      break;
    }
  }
  if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
  newValue = shortValue + suffixes[suffixNum];
  return newValue;
};

export const formatNumber = (value, option, statistic) => {
  if (statistic && value === 0 && NAN_STATISTICS.includes(statistic))
    value = NaN;

  if (isNaN(value)) return '-';
  else if (option === 'short') {
    return abbreviateNumber(value);
  } else if (option === 'int') {
    value = Math.floor(value);
  }
  return numberFormatter.format(value) + (option === '%' ? '%' : '');
};

export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const getStatistic = (data, type, statistic, perMillion = false) => {
  const {key, normalizeByKey: normalizeBy, multiplyFactor} = {
    ...STATISTIC_OPTIONS[statistic],
    ...(perMillion &&
      !STATISTIC_OPTIONS[statistic]?.normalizeByKey &&
      PER_MILLION_OPTIONS),
  };

  let count;
  if (key === 'total') {
    count = type === 'total' ? data?.meta?.total : 0;
  } else {
    count = data?.[type]?.[key];
  }

  if (normalizeBy) {
    if (type === 'total') {
      const normStatistic = getStatistic(data, 'total', normalizeBy);
      count /= normStatistic;
    } else {
      const currStatisticDelta = count;
      const currStatistic = getStatistic(data, 'total', key);
      const prevStatistic = currStatistic - currStatisticDelta;

      const normStatisticDelta = getStatistic(data, 'delta', {
        key: normalizeBy,
      });
      const normStatistic = getStatistic(data, 'total', normalizeBy);
      const prevNormStatistic = normStatistic - normStatisticDelta;

      count = currStatistic / normStatistic - prevStatistic / prevNormStatistic;
    }
  }

  return (multiplyFactor || 1) * ((isFinite(count) && count) || 0);
};

export const getTableStatistic = (
  data,
  statistic,
  isPerMillion,
  lastUpdatedTT
) => {
  const total = getStatistic(data, 'total', statistic, isPerMillion);
  const delta = getStatistic(data, 'delta', statistic, isPerMillion);
  return {total, delta};
};

export const fetcher = (url) => {
  return fetch(url).then((response) => {
    return response.json();
  });
};
