export default function formatPrice(price: number, fixed?: boolean) {
  const process = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  if (price === 0) return "£";
  return fixed ? process.format(price).slice(0, -3) : process.format(price);
}
