import NumberFlow from "@number-flow/react";

interface AnimatedScoreProps {
  value: number;
}

function AnimatedScore({ value }: AnimatedScoreProps) {
  return (
    <NumberFlow
      value={value}
      locales="en-US"
      format={{ useGrouping: true }}
      willChange
    />
  );
}

export default AnimatedScore;
