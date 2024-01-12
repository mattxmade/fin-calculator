import currencies, { Currency, CurrencyKeys } from "./currencies";

type FormatPrice = (
  price: number,
  currencyKey: CurrencyKeys,
  fixed?: boolean
) => string;

const formatPrice: FormatPrice = (price, currencyKey, fixed) => {
  const currency: Currency = currencies[currencyKey];

  const process = Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
  });

  if (price === 0) return process.format(price).slice(0, 1);
  return fixed ? process.format(price) : process.format(price).slice(0, -3);
};

export default formatPrice;
