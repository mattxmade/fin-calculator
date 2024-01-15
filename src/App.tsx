import { useState } from "react";

import BridgeLoanCalculator from "./components/BridgeLoanCalculator";
import MortgageRepaymentCalculator from "./components/MortgageRepaymentCalculator";
import "./App.css";

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
          <h1>Choose A Calculator</h1>

          <section style={{ display: "flex", gap: "1rem" }}>
            <button onClick={() => setcalculatorChoice("Bridge")}>
              Bridge Loan Calculator
            </button>
            <button onClick={() => setcalculatorChoice("Mortgage")}>
              Mortgage Repyament Calculator
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
