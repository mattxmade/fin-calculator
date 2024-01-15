import generateLabelName from "../../utils/generateLabelName";

export type SelectInput = {
  name: string;
  type: string;
  label: string;
  defaultValue: string;
  select: { options: string[] };
};

type SelectInputProps = {
  input: SelectInput;
  value?: string;
  children?: React.ReactNode;
  handleSelectInput: (
    e: React.ChangeEvent<HTMLSelectElement>,
    inputName: string
  ) => void;
};

export default function SelectInputSection(props: SelectInputProps) {
  const labelTag = generateLabelName(props.input.label);

  return (
    <section key={labelTag}>
      <label htmlFor={labelTag}>{props.input.label}</label>
      <select
        name={labelTag}
        onChange={(e) => props.handleSelectInput(e, props.input.name)}
      >
        {props.input.select.options.map((option, i) =>
          props.input.defaultValue === option ? (
            <option key={i} defaultValue={option}>
              {option}
            </option>
          ) : (
            <option key={i}>{option}</option>
          )
        )}
      </select>
    </section>
  );
}
