import generateLabelName from "../../utils/generateLabelName";

export type TextInput = {
  name: string;
  type: string;
  label: string;
  defaultValue: number;
};

type TextInputProps = {
  input: TextInput;
  value: number | string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => void;
};

export default function TextInputSection(props: TextInputProps) {
  const labelTag = generateLabelName(props.input.label);

  return (
    <section key={labelTag}>
      <section>
        <label htmlFor={labelTag}>{props.input.label}</label>
        <input
          name={labelTag}
          type="text"
          value={props.value}
          onChange={(e) => props.handleInputChange(e, props.input.name)}
        />
      </section>
    </section>
  );
}
