import { BlcResult } from "./BridgeLoanCalculator";

type CalculatorResultProps = {
  title: string;
  result: BlcResult;
  children?: React.ReactNode;
} & JSX.IntrinsicElements["div"];

export default function CalculatorResult(props: CalculatorResultProps) {
  const { title, result, children } = props;
  const resultData = Object.entries(result);

  return (
    <div>
      <h1>{title}</h1>

      {resultData.map((resultVal) => {
        const resultTitle = resultVal[0];
        const resultValue = resultVal[1];

        return (
          <section style={{ display: "grid" }}>
            <h2>{resultTitle}</h2>
            <p>{resultValue}</p>
          </section>
        );
      })}

      {children}
    </div>
  );
}
