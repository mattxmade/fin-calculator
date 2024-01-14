import { useCallback, useState } from "react";
import { CurrencyKeys } from "../utils/currencies";
import RangeInputSection from "./inputs/RangeInputSection";
import SelectInputSection from "./inputs/SelectInputSection";
import TextInputSection from "./inputs/TextInputSection";

type HousePriceProps = {
  label?: string;
};

type CostResultSelectProps = {
  options?: [string, string];
};

type DepositAmountProps = {
  label?: string;
};

type TermLengthProps = {
  label?: string;
  defaultValue?: number;
  range?: { steps: 1; min: 0; max: number };
};

type AnnualInterestProps = {
  label?: string;
  defaultValue?: number;
  range?: { steps: 0.1; min: 1; max: number };
};

type MorgageCalcInputValues = {
  [index: string]: number | string;
  "House price": number;
  "Cost result select": string;
  "Deposit amount": number;
  "Term length": number;
  "Annual interest": number;
};

export type HandleInputChangeParams = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  inputName: keyof MorgageCalcInputValues
) => void;

type CostCalculatorProps = {
  currency?: CurrencyKeys;
  housePrice?: HousePriceProps;
  costResultSelect?: CostResultSelectProps;
  depositAmount?: DepositAmountProps;
  termLength?: TermLengthProps;
  annualInterest?: AnnualInterestProps;
  children?: React.ReactNode;
};

export default function CostCalculator(props: CostCalculatorProps) {
  const currency = props.currency ?? "GBP";
  currency;

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
    range: { steps: 1, min: 0, max: Infinity },
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

  const [inputValues, setInputValues] = useState<MorgageCalcInputValues>({
    "House price": housePriceInput.defaultValue,
    "Cost result select": costResultSelectInput.defaultValue,
    "Deposit amount": depositAmountInput.defaultValue,
    "Term length": termLengthRangeInput.defaultValue,
    "Annual interest": annualInterestRangeInput.defaultValue,
  });

  const [monthlyRepayment, setMonthlyRepayment] = useState<number | null>(null);

  const handleCalcInput: HandleInputChangeParams = useCallback(
    (e, inputName) => {
      const key = Object.keys(inputValues).find(
        (inputState) => inputState === inputName
      );

      if (!key) return;

      setInputValues(inputValues);
    },
    [inputValues]
  );

  const handleFormSubmit = () => {};

  return (
    <>
      <form id="blc-form" {...props}>
        <h1>Bridging Loan Calcualtor</h1>

        <TextInputSection
          input={housePriceInput}
          value={inputValues["House price"]}
          handleInputChange={handleCalcInput}
        />
        <SelectInputSection
          input={costResultSelectInput}
          value={inputValues["Cost result select"]}
          handleSelectInput={handleCalcInput}
        />
        <RangeInputSection
          input={depositAmountInput}
          value={inputValues["Deposit amount"]}
          handleInputChange={handleCalcInput}
        />
        <RangeInputSection
          input={termLengthRangeInput}
          value={inputValues["Term length"]}
          handleInputChange={handleCalcInput}
        />
        <RangeInputSection
          input={annualInterestRangeInput}
          value={inputValues["Annual interest"]}
          handleInputChange={handleCalcInput}
        />

        <button type="submit" form="blc-form" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>

      {monthlyRepayment ? <p>{monthlyRepayment}</p> : <></>}

      {props.children}
    </>
  );
}
