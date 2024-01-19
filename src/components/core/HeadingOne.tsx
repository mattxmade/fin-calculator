type HeadingOneProps = {
  children?: React.ReactNode;
} & React.ComponentProps<"h1">;

export const HeadingOne = ({ children, ...props }: HeadingOneProps) => (
  <h1 {...props}>{children}</h1>
);
