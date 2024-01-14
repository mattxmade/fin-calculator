const extractNumberFromString = (input: string): number =>
  Number(
    input
      .trim()
      .split("")
      .filter((value) => !isNaN(+value) || (value === "." && value))
      .join("")
  );

export default extractNumberFromString;
