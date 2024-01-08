import { useState } from "react";

type BlcProps = {
  children?: React.ReactNode;
} & JSX.IntrinsicElements["form"];

type BlcFormData = {
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

  const handleCalcInput = () => {};

  return (
    <form {...props}>
      <h1>Bridging Loan Calcualtor</h1>

      <section>
        <label htmlFor="blc-property-value">Property value</label>
        <input
          name="blc-property-value"
          type="text"
          defaultValue="£"
          value={formData["blc-property-value"]}
        />
      </section>

      <section>
        <label htmlFor="blc-loan-amount">Loan amount required</label>
        <input
          name="blc-loan-amount"
          type="text"
          defaultValue="£"
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
            defaultValue="1%"
            value={formData["blc-monthly-interest-rate"]}
          />
        </section>

        <input
          name="blc-monthly-interest-rate"
          defaultValue="1"
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
            defaultValue="6"
            value={formData["blc-loan-term-length"]}
          />
        </section>

        <input
          name="blc-loan-term-length"
          defaultValue="6"
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
            defaultValue="2%"
            value={formData["blc-product-fee"]}
          />
        </section>

        <input
          name="blc-product-fee"
          defaultValue="2"
          type="range"
          step="1"
          min="1"
          max="3"
        />
      </section>
    </form>
  );
}
