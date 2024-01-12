/**
 * Currencies
 * https://github.com/andyearnshaw/Intl.js/blob/0958dc1ad8153f1056653ea22b8208f0df289a4e/locale-data/json/en-GB.json#L294C1-L315C10
 */

export const currencies = {
  AUD: { symbol: "$", code: "USD", locale: "en" },
  BRL: { symbol: "$", code: "USD", locale: "en" },
  CAD: { symbol: "$", code: "USD", locale: "en" },
  CNY: { symbol: "¥", code: "CNY", locale: "zh" },
  EUR: { symbol: "€", code: "EUR", locale: "en" },
  GBP: { symbol: "£", code: "GBP", locale: "en" },
  HKD: { symbol: "$", code: "USD", locale: "en" },
  ILS: { symbol: "₪", code: "ILS", locale: "ar" },
  INR: { symbol: "₹", code: "INR", locale: "en" },
  JPY: { symbol: "¥", code: "JPY", locale: "en" },
  KRW: { symbol: "₩", code: "KRW", locale: "en" },
  MXN: { symbol: "$", code: "USD", locale: "en" },
  NZD: { symbol: "$", code: "USD", locale: "en" },
  TWD: { symbol: "$", code: "USD", locale: "en" },
  USD: { symbol: "$", code: "USD", locale: "en" },
  VND: { symbol: "₫", code: "VND", locale: "en" },
  XCD: { symbol: "$", code: "USD", locale: "en" },
};

export type Currency = (typeof currencies)[CurrencyKeys]; // [1]
export type CurrencyKeys = keyof typeof currencies;

export default currencies;

/*
 [1] INFO: keyof typeof
     LINK: https://youtu.be/6M9aZzm-kEc?t=270
*/
