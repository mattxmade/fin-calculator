import generateLabelName from "../../utils/generateLabelName";

export type RangeInput = {
  name: string;
  type: string;
  label: string;
  defaultValue: number;
  range: {
    steps: number;
    min: number;
    max: number;
  };
};

type RangeInputProps = {
  input: RangeInput;
  value: number;
  dynamicMax?: number;
  children?: React.ReactNode;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => void;
};

export default function RangeInputSection(props: RangeInputProps) {
  const labelTag = generateLabelName(props.input.label);

  return (
    <section key={labelTag}>
      {props.children}

      <input
        name={labelTag}
        value={props.value}
        type="range"
        step={props.input.range.steps}
        min={props.input.range.min}
        max={props.dynamicMax ?? props.input.range.max}
        onChange={(e) => props.handleInputChange(e, props.input.name)}
      />
    </section>
  );
}
