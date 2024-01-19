import { useState } from "react";

/**
 * Stylesheets
 */
import "./App.css";

/**
 * Custom React Components
 */
import { HeadingOne } from "./components/core/HeadingOne";
import BridgeLoanCalculator from "./components/BridgeLoanCalculator";
import MortgageRepaymentCalculator from "./components/MortgageRepaymentCalculator";

function App() {
  const restoreChoice = localStorage.getItem("calculator") as
    | "Bridge"
    | "Mortgage";

  const [calculatorChoice, setcalculatorChoice] = useState<
    "Bridge" | "Mortgage" | null
  >(restoreChoice ?? null);

  calculatorChoice
    ? localStorage.setItem("calculator", calculatorChoice)
    : localStorage.setItem("calculator", "");

  return (
    <main>
      {calculatorChoice ? (
        <>
          <button onClick={() => setcalculatorChoice(null)}>Back</button>
          {calculatorChoice === "Bridge" ? (
            <BridgeLoanCalculator />
          ) : (
            <MortgageRepaymentCalculator />
          )}
        </>
      ) : (
        <>
          <HeadingOne>Choose A Calculator</HeadingOne>

          <section style={{ display: "flex", gap: "1rem" }}>
            <button
              className="icon-button"
              onClick={() => setcalculatorChoice("Bridge")}
            >
              <i className="fa-solid fa-coins" />
              Bridge Loan Calculator
            </button>
            <button
              className="icon-button"
              onClick={() => setcalculatorChoice("Mortgage")}
            >
              <i className="fa-solid fa-house" />
              Mortgage Repyament Calculator
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
