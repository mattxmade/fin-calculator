import { useCallback, useState } from "react";
import CalculatorResult from "./CalculatorResult";
import formatPrice from "../utils/formatPrice";
import generateLabelName from "../utils/generateLabelName";

type BlcProps = {
  currency?: "£" | "$";
  productFee?: ProductFeeInput;
  propertyValue?: PropertyValueInput;
  loanTermLength?: LoanTermLengthInput;
  loanAmountRequired?: LoanAmountRequiredInput;
  monthlyInterestRate?: MonthlyInterestRateInput;
  children?: React.ReactNode;
} & JSX.IntrinsicElements["form"];

type RangeInput = { steps: number; min: number; max: number };

type PropertyValueInput = {
  label?: string;
};

type LoanAmountRequiredInput = {
  label?: string;
};

type MonthlyInterestRateInput = {
  label?: string;
  defaultValue: number;
  range: RangeInput;
};

type LoanTermLengthInput = {
  label?: string;
  defaultValue: number;
  range: RangeInput;
};

type ProductFeeInput = {
  label?: string;
  defaultValue: number;
  range: RangeInput;
};

type BlcFormData = {
  [index: string]: number;
  "Property value": number;
  "Loan amount required": number;
  "Monthly interest rate": number;
  "Loan term length": number;
  "Product fee": number;
};

export type BlcResult = {
  [index: string]: string;
  "Net loan amount": string;
  "Interest amount": string;
  "Product fees": string;
  "Gross loan amount": string;
  "Loan to value": string;
};

type InputOption = {
  name: string;
  label: string;
  defaultValue: string | number;
  type: "currency" | "percentage" | "number";
  range: { steps: number; min: number; max: number } | null;
};

export default function BridgeLoanCalculator(props: BlcProps) {
  const productValue = {
    name: "Property value",
    type: "currency" as "currency",
    range: null,
    defaultValue: 0,
    label: props.propertyValue?.label ?? "Property value",
  };

  const loanAmountRequired = {
    name: "Loan amount required",
    type: "currency" as "percentage",
    range: null,
    defaultValue: 0,
    label: props.loanAmountRequired?.label ?? "Loan amount required",
  };

  const monthlyInterestRate = {
    name: "Monthly interest rate",
    type: "percentage" as "percentage",
    label: props.monthlyInterestRate?.label ?? "Monthly interest rate",
    defaultValue: props.monthlyInterestRate?.defaultValue ?? 1,
    range: props.monthlyInterestRate?.range ?? {
      steps: 0.1,
      min: 0,
      max: 2,
    },
  };

  const loanTermLength = {
    name: "Loan term length",
    type: "number" as "number",
    label: props.loanTermLength?.label ?? "Loan term length (months)",
    defaultValue: props.loanTermLength?.defaultValue ?? 6,
    range: props.loanTermLength?.range ?? {
      steps: 1,
      min: 6,
      max: 18,
    },
  };

  const productFee = {
    name: "Product fee",
    type: "percentage" as "percentage",
    label: props.loanTermLength?.label ?? "Product fee",
    defaultValue: props.loanTermLength?.defaultValue ?? 2,
    range: props.loanTermLength?.range ?? {
      steps: 1,
      min: 1,
      max: 3,
    },
  };

  const blcOptions = [
    productValue,
    loanAmountRequired,
    monthlyInterestRate,
    loanTermLength,
    productFee,
  ];

  const [result, setResult] = useState<BlcResult | null>();

  const [formData, setFormData] = useState<BlcFormData>({
    "Property value": productValue.defaultValue,
    "Loan amount required": loanAmountRequired.defaultValue,
    "Monthly interest rate": monthlyInterestRate.defaultValue,
    "Loan term length": loanTermLength.defaultValue,
    "Product fee": productFee.defaultValue,
  });

  const handleCalcInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputData: InputOption
  ) => {
    const input = e.target as HTMLInputElement;
    // const containsNumber = /\d/; // [1]

    const key = Object.keys(formData).find(
      (formInput) => formInput === inputData.name
    );

    if (!key) return;

    let valid = false;
    const inputValue = Number(
      input.value
        .trim()
        .split("")
        .filter((value) => !isNaN(+value) || (value === "." && value))
        .join("")
    );

    if (input.type !== "range") valid = true;
    if (input.type === "range" && inputData.range) {
      valid =
        inputValue >= inputData.range.min && inputValue <= inputData.range.max;
    }

    if (!valid) return;
    setFormData({ ...formData, [key]: inputValue });
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const productFee = formData["Product fee"];
    const propertyValue = formData["Property value"];
    const loanAmount = formData["Loan amount required"];
    const loanTermLength = formData["Loan term length"];
    const monthlyInterestRate = formData["Monthly interest rate"];

    if (
      !propertyValue ||
      !loanAmount ||
      !monthlyInterestRate ||
      !loanTermLength ||
      !productFee
    )
      return;

    const netLoanAmount = loanAmount;
    const interestAmount =
      (loanAmount / 100) * monthlyInterestRate * loanTermLength;

    const amountBeforeFees = netLoanAmount + interestAmount;

    const productFees = (amountBeforeFees / 100) * productFee;
    const grossLoanAmount = amountBeforeFees + productFees;
    const loanToValue = ((grossLoanAmount / propertyValue) * 100).toFixed(2);

    const calcResults = {} as BlcResult;

    calcResults["Net loan amount"] = formatPrice(netLoanAmount, true);
    calcResults["Interest amount"] = formatPrice(interestAmount, true);
    calcResults["Product fees"] = formatPrice(productFees, true);
    calcResults["Gross loan amount"] = formatPrice(grossLoanAmount, true);
    calcResults["Loan to value"] = loanToValue + "%";

    setResult(calcResults);
  };

  const clearResult = useCallback(() => setResult(null), [result]);

  return (
    <>
      {result ? (
        <CalculatorResult
          title="Bridge Loan Calcualtor"
          result={result as BlcResult}
          backToCalcView={clearResult}
        />
      ) : (
        <form id="blc-form" {...props}>
          <h1>Bridging Loan Calcualtor</h1>

          {blcOptions.map((option) => {
            const labelName = generateLabelName(option.label);

            return !option.range ? (
              <section key={labelName}>
                <label htmlFor={labelName}>{option.label}</label>
                <input
                  name={labelName}
                  type="text"
                  value={formatPrice(formData[option.name], true)}
                  onChange={(e) => handleCalcInput(e, option)}
                />
              </section>
            ) : (
              <section key={labelName}>
                <section>
                  <label htmlFor={labelName}>{option.label}</label>
                  <input
                    name={labelName}
                    type="text"
                    value={formData[option.name]}
                    onChange={(e) => handleCalcInput(e, option)}
                  />
                </section>

                <input
                  name={labelName}
                  value={formData[option.name]}
                  type="range"
                  step={option.range.steps}
                  min={option.range.min}
                  max={option.range.max}
                  onChange={(e) => handleCalcInput(e, option)}
                />
              </section>
            );
          })}

          <button type="submit" form="blc-form" onClick={handleFormSubmit}>
            Submit
          </button>
        </form>
      )}
      {props.children}
    </>
  );
}

/*
 [1] INFO: regex: return true if string contains a number
     LINK: https://stackoverflow.com/a/63546092
*/
