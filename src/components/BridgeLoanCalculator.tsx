import { useState } from "react";

type BlcProps = {
  children?: React.ReactNode;
} & JSX.IntrinsicElements["form"];

type BlcFormData = {
  [index: string]: string;
  "blc-property-value": string;
  "blc-loan-amount": string;
  "blc-monthly-interest-rate": string;
  "blc-loan-term-length": string;
  "blc-product-fee": string;
};

export default function BridgeLoanCalculator({ children, ...props }: BlcProps) {
  const [formData, setFormData] = useState<BlcFormData>({
    "blc-property-value": "£",
    "blc-loan-amount": "£",
    "blc-monthly-interest-rate": "1%",
    "blc-loan-term-length": "6",
    "blc-product-fee": "2%",
  });

  const handleCalcInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    const key = Object.keys(formData).find(
      (formInput) => formInput === input.name
    );

    if (!key) return;

    let validInput = false;
    let inputValue = input.value;

    const isMoneyValue = formData[key].startsWith("£");
    const isPercentage = formData[key].endsWith("%");

    if (isMoneyValue) {
      // VALIDATE CURRENCY TEXT INPUT

      if (inputValue.startsWith("£")) validInput = true;
      if (isNaN(Number(inputValue.slice(1)))) validInput = false;
    } else if (isPercentage) {
      // VALIDATE PERCENTAGE TEXT INPUT

      const percentage = Number(inputValue.slice(0, inputValue.length - 1));

      if (key === "blc-monthly-interest-rate")
        percentage >= 0 && percentage <= 2
          ? (validInput = true)
          : (validInput = false);

      if (key === "blc-product-fee")
        percentage >= 1 && percentage <= 3
          ? (validInput = true)
          : (validInput = false);
    } else {
      // VALIDATE MONTHS TEXT INPUT

      const months = Number(inputValue);

      if (key === "blc-loan-term-length")
        (months >= 6 && months <= 18) || inputValue === ""
          ? (validInput = true)
          : (validInput = false);
    }

    if (!validInput) return;
    setFormData((prevFormData) => ({ ...prevFormData, [key]: inputValue }));
  };

  return (
    <form {...props}>
      <h1>Bridging Loan Calcualtor</h1>

      <section>
        <label htmlFor="blc-property-value">Property value</label>
        <input
          name="blc-property-value"
          type="text"
          placeholder="£"
          onChange={handleCalcInput}
          value={formData["blc-property-value"]}
        />
      </section>

      <section>
        <label htmlFor="blc-loan-amount">Loan amount required</label>
        <input
          name="blc-loan-amount"
          type="text"
          placeholder="£"
          onChange={handleCalcInput}
          value={formData["blc-loan-amount"]}
        />
      </section>

      <section>
        <section>
          <label htmlFor="blc-monthly-interest-rate">
            Montly interest rate
          </label>
          <input
            name="blc-monthly-interest-rate"
            type="text"
            placeholder="1%"
            onChange={handleCalcInput}
            value={formData["blc-monthly-interest-rate"]}
          />
        </section>

        <input
          name="blc-monthly-interest-rate"
          defaultValue={formData["blc-monthly-interest-rate"]}
          type="range"
          step="0.1"
          min="0"
          max="2"
        />
      </section>

      <section>
        <section>
          <label htmlFor="blc-loan-term-length">
            Long term length (months)
          </label>
          <input
            name="blc-loan-term-length"
            type="text"
            placeholder="6"
            onChange={handleCalcInput}
            value={formData["blc-loan-term-length"]}
          />
        </section>

        <input
          name="blc-loan-term-length"
          defaultValue={formData["blc-loan-term-length"]}
          type="range"
          step="1"
          min="6"
          max="18"
        />
      </section>

      <section>
        <section>
          <label htmlFor="blc-product-fee">Product fee</label>
          <input
            name="blc-product-fee"
            type="text"
            placeholder="2%"
            onChange={handleCalcInput}
            value={formData["blc-product-fee"]}
          />
        </section>

        <input
          name="blc-product-fee"
          defaultValue={formData["blc-product-fee"]}
          type="range"
          step="1"
          min="1"
          max="3"
        />
      </section>
    </form>
  );
}
