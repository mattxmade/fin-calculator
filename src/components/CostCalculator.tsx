import { useState } from "react";

import { CurrencyKeys } from "../utils/currencies";

type HousePriceInput = {
  label?: string;
};

type CostResultSelectInput = {
  options?: [string, string];
};

type DepositAmountInput = {
  label?: string;
};

type TermLengthInput = {
  label?: string;
  defaultValue?: number;
  range?: { steps: 1; min: 0; max: number };
};

type AnnualInterestInput = {
  label?: string;
  defaultValue?: number;
  range?: { steps: 0.1; min: 1; max: number };
};

type CostCalculatorProps = {
  currency?: CurrencyKeys;
  housePrice?: HousePriceInput;
  costResultSelect?: CostResultSelectInput;
  depositAmount?: DepositAmountInput;
  termLength?: TermLengthInput;
  annualInterest?: AnnualInterestInput;
  children?: React.ReactNode;
};

export default function CostCalculator(props: CostCalculatorProps) {
  const housePriceInput = {
    name: "House price",
    type: "currency",
    label: props.housePrice?.label ?? "House price",
    defaultValue: 0,
  };

  const costResultSelectInput = {
    name: "Cost result select",
    type: "select",
    label: "Cost result",
    defaultValue: props.costResultSelect?.options?.length
      ? props.costResultSelect.options[0]
      : "Repayment",
    select: {
      options: props.costResultSelect?.options || [
        "Repayment",
        "Interest only",
      ],
    },
  };

  const depositAmountInput = {
    name: "Deposit amount",
    type: "currency",
    label: props.depositAmount?.label ?? "Deposit amount",
    defaultValue: 0,
  };

  const termLengthRangeInput = {
    name: "Term length",
    type: "percentage",
    label: props.termLength?.label ?? "Term length",
    defaultValue: props.termLength?.defaultValue ?? 1,
    range: props.termLength?.range ?? {
      steps: 1,
      min: 0,
      max: 40,
    },
  };

  const annualInterestRangeInput = {
    name: "Annual interest",
    type: "percentage",
    label: props.annualInterest?.label ?? "Annual interest",
    defaultValue: props.annualInterest?.defaultValue ?? 1,
    range: props.annualInterest?.range ?? {
      steps: 0.1,
      min: 1,
      max: 20,
    },
  };

  const [inputValues, setInputValues] = useState({
    "House price": housePriceInput.defaultValue,
    "Cost result select": costResultSelectInput.defaultValue,
    "Deposit amount": depositAmountInput.defaultValue,
    "Term length": termLengthRangeInput.defaultValue,
    "Annual interest": annualInterestRangeInput.defaultValue,
  });

  const calculatorInputs = [
    housePriceInput,
    costResultSelectInput,
    depositAmountInput,
    termLengthRangeInput,
    annualInterestRangeInput,
  ];

  return <h1>Cost Calculator</h1>;
}
