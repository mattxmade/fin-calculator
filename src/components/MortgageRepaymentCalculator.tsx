import { useCallback, useEffect, useState } from "react";
import { CurrencyKeys } from "../utils/currencies";
import RangeInputSection from "./inputs/RangeInputSection";
import SelectInputSection from "./inputs/SelectInputSection";
import TextInputSection from "./inputs/TextInputSection";
import extractNumberFromString from "../utils/extractNumberFromString";
import formatPrice from "../utils/formatPrice";

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

type MortgageCalcInputValues = {
  [index: string]: number | string;
  "House price": number;
  "Cost result select": string;
  "Deposit amount": number;
  "Term length": number;
  "Annual interest": number;
};

export type HandleInputChangeParams = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  inputName: keyof MortgageCalcInputValues
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
      : "Capital repayment",
    select: {
      options: props.costResultSelect?.options || [
        "Capital repayment",
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

  const [inputValues, setInputValues] = useState<MortgageCalcInputValues>({
    "House price": housePriceInput.defaultValue,
    "Cost result select": costResultSelectInput.defaultValue,
    "Deposit amount": depositAmountInput.defaultValue,
    "Term length": termLengthRangeInput.defaultValue,
    "Annual interest": annualInterestRangeInput.defaultValue,
  });

  const [monthlyRepayment, setMonthlyRepayment] = useState<number>(0);

  const handleCalcInput: HandleInputChangeParams = useCallback(
    (e, inputName) => {
      const key = Object.keys(inputValues).find(
        (inputState) => inputState === inputName
      );

      if (!key) return;
      const input = e.target as HTMLInputElement;

      const inputValue = input.type.includes("select")
        ? input.value
        : extractNumberFromString(input.value);

      if (typeof inputValue === "string") {
        return setInputValues({ ...inputValues, [key]: inputValue });
      }

      if (key === "House price") {
        const housePrice = inputValue;
        const depositAmount = inputValues["Deposit amount"];

        return depositAmount > housePrice
          ? setInputValues({
              ...inputValues,
              [key]: housePrice,
              "Deposit amount": housePrice,
            })
          : setInputValues({ ...inputValues, [key]: inputValue });
      }

      if (key === "Deposit amount") {
        const housePrice = inputValues["House price"];
        const depositAmount = inputValue;

        return depositAmount > housePrice
          ? setInputValues({ ...inputValues, [key]: housePrice })
          : setInputValues({ ...inputValues, [key]: inputValue });
      }

      setInputValues({ ...inputValues, [key]: inputValue });
    },
    [inputValues]
  );

  const handleFormSubmit = () => {
    if (!Object.values(inputValues).every((value) => value && value)) return;

    const housePrice = inputValues["House price"];
    const depositAmount = inputValues["Deposit amount"];

    const loanAmount = housePrice - depositAmount;
    const termLength = inputValues["Term length"];

    const annualInterest = inputValues["Annual interest"];
    const repaymentType = inputValues["Cost result select"];

    let result = 0;

    if (repaymentType === "Interest only") {
    }

    if (repaymentType === "Capital repayment") {
    }

    setMonthlyRepayment(result);
  };

  useEffect(handleFormSubmit, [inputValues]);

  return (
    <>
      <form id="blc-form" {...props}>
        <h1>Bridging Loan Calcualtor</h1>

        <SelectInputSection
          input={costResultSelectInput}
          value={inputValues["Cost result select"]}
          handleSelectInput={handleCalcInput}
        />
        <TextInputSection
          input={housePriceInput}
          value={formatPrice(inputValues["House price"], currency)}
          handleInputChange={handleCalcInput}
        />

        <RangeInputSection
          input={depositAmountInput}
          dynamicMax={inputValues["House price"]}
          value={inputValues["Deposit amount"]}
          handleInputChange={handleCalcInput}
        >
          <TextInputSection
            input={depositAmountInput}
            value={formatPrice(inputValues["Deposit amount"], currency)}
            handleInputChange={handleCalcInput}
          />
        </RangeInputSection>

        <RangeInputSection
          input={termLengthRangeInput}
          value={inputValues["Term length"]}
          handleInputChange={handleCalcInput}
        >
          <TextInputSection
            input={termLengthRangeInput}
            value={inputValues["Term length"]}
            handleInputChange={handleCalcInput}
          />
        </RangeInputSection>

        <RangeInputSection
          input={annualInterestRangeInput}
          value={inputValues["Annual interest"]}
          handleInputChange={handleCalcInput}
        >
          <TextInputSection
            input={annualInterestRangeInput}
            value={inputValues["Annual interest"]}
            handleInputChange={handleCalcInput}
          />
        </RangeInputSection>
      </form>

      <p>
        {!monthlyRepayment ? "£0" : formatPrice(monthlyRepayment, currency)}
      </p>

      {props.children}
    </>
  );
}
