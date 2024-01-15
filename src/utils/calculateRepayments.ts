type CalcRepayParams = (
  amount: number,
  rate: number,
  years: number,
  type: "capital repayment" | "interest only"
) => number;

const calculateRepayments: CalcRepayParams = (amount, rate, years, type) => {
  if (type === "interest only") return ((amount / 100) * rate) / 12;

  // capital repayment Formula [1]
  const interestRate = rate / 12 / 100;
  const numberOfPayments = years * 12;

  const numerator = interestRate * Math.pow(1 + interestRate, numberOfPayments);
  const denominator = Math.pow(1 + interestRate, numberOfPayments) - 1;

  // capital repayment;
  return amount * (numerator / denominator);
};

export default calculateRepayments;

/*
  [1] INFO: Morgage payment formula
     LINK: https://onladder.co.uk/blog/how-to-calculate-mortgage-repayments/

     P = PRINCIPAL_AMOUNT
     N = DURATION_IN_YEARS / 12  

     :: Capital ::
     ---------------------------------------------------
     R = (INTEREST_RATE / 100) * 12
     I = R x (1 + (R))pow(N) ÷ (1 + R)pow(N) - 1
     P x I

     :: Interest Only ::
     ---------------------------------------------------
     R = INTEREST_RATE
     ((P / 100) * R) / 12
*/
