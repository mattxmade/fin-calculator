type BlcProps = {
  children?: React.ReactNode;
} & JSX.IntrinsicElements["form"];

export default function BridgeLoanCalculator({ children, ...props }: BlcProps) {
  return <form {...props}></form>;
}
