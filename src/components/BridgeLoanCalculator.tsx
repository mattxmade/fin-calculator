type BlcProps = {
  children?: React.ReactNode;
} & JSX.IntrinsicElements["form"];

export default function BridgeLoanCalculator({ children, ...props }: BlcProps) {
  return (
    <form {...props}>
      <h1>Bridging Loan Calcualtor</h1>

      <section>
        <label htmlFor="blc-property-value">Property value</label>
        <input name="blc-property-value" type="text" defaultValue="£" />
      </section>

      <section>
        <label htmlFor="blc-loan-amount">Loan amount required</label>
        <input name="blc-loan-amount" type="text" defaultValue="£" />
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
            Long term lengths (months)
          </label>
          <input name="blc-loan-term-length" type="text" />
        </section>

        <input
          name="blc-loan-term-length"
          defaultValue="1"
          type="range"
          step="0.1"
          min="0"
          max="2"
        />
      </section>

      <section>
        <section>
          <label htmlFor="blc-product-fee">Product fee</label>
          <input name="blc-product-fee" type="text" defaultValue="2%" />
        </section>

        <input
          name="blc-product-fee"
          defaultValue="1"
          type="range"
          step="1"
          min="1"
          max="3"
        />
      </section>
    </form>
  );
}
