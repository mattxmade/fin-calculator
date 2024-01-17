type HeadingOneProps = {
  children?: React.ReactNode;
} & JSX.IntrinsicElements["h1"];

export const HeadingOne = ({ ...props }: HeadingOneProps) => (
  <h1 className="text-pretty font-bold mb-10" {...props}>
    {props.children}
  </h1>
);
