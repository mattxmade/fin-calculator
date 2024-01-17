import { BlcResult } from "./BridgeLoanCalculator";
import { HeadingOne } from "./HeadingOne";

type CalculatorResultProps = {
  title: string;
  result: BlcResult;
  backToCalcView: () => void;
  children?: React.ReactNode;
} & JSX.IntrinsicElements["div"];

export default function CalculatorResult(props: CalculatorResultProps) {
  const { title, result, children } = props;
  const resultData = Object.entries(result);

  return (
    <div className="calculator-result-container">
      <HeadingOne>{title}</HeadingOne>

      {resultData.map((resultVal, i) => {
        const resultTitle = resultVal[0];
        const resultValue = resultVal[1];

        return (
          <section key={i}>
            <h2>{resultTitle}</h2>
            <p>{resultValue}</p>
          </section>
        );
      })}

      <button onClick={props.backToCalcView}>Back</button>
      {children}
    </div>
  );
}
