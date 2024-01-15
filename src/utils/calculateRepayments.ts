type CalcRepayParams = (
  amount: number,
  rate: number,
  years: number,
  type: "capital" | "interest only"
) => number;

const calculateRepaymenets: CalcRepayParams = (amount, rate, years, type) => {
  if (type === "interest only") return ((amount / 100) * rate) / 12;
};
