import React from 'react';
import NumberFormat from 'react-number-format';

export const dollarSignWithDecimal = (val, decimal) => {
  return (
    (val !== 0 && !val)?'N/A':
    <NumberFormat
      value={ val }
      displayType={ 'text' }
      thousandSeparator={ true }
      prefix={ '$' }
      decimalScale={ decimal }
      fixedDecimalScale={ true }
    />
  )
};

export const dollarPositiveSignWithDecimal = (val, decimal) => {
  return (
    (val !== 0 && !val)?'N/A':
      <NumberFormat
        value={ val }
        displayType={ 'text' }
        thousandSeparator={ true }
        prefix={ (val > 0)?'+$':'$' }
        decimalScale={ decimal }
        fixedDecimalScale={ true }
      />
  )
};

export const decimalOnly = (val, decimal) => {
  return (
    (val === 0 || !val)?'N/A':
    <NumberFormat
      value={ val }
      displayType={ 'text' }
      thousandSeparator={ true }
      decimalScale={ decimal }
      fixedDecimalScale={ true }
    />
  )
};

export const percentWithDecimal = (val, decimal) => {
  return (
    (val !== 0 && !val)?'N/A':
    <NumberFormat
      value={ val }
      displayType={ 'text' }
      suffix={ '%' }
      decimalScale={ decimal }
      fixedDecimalScale={ true }
    />
  )
};

export const shortNum = (num, decimal) => {
  let val = Math.abs(Number(num)) >= 1.0e+9
  ? (Math.abs(Number(num)) / 1.0e+9).toFixed(decimal) + "B"
  : Math.abs(Number(num)) >= 1.0e+6
  ? (Math.abs(Number(num)) / 1.0e+6).toFixed(decimal) + "M"
  : Math.abs(Number(num)) >= 1.0e+3
  ? (Math.abs(Number(num)) / 1.0e+3).toFixed(decimal) + "K"
  : Math.abs(Number(num));
  return (val === 0)?'N/A':val;
};