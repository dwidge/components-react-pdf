import { useFormatDate } from "@dwidge/timezone-react";
import { StyledText, StyledTextProps } from "./StyledText";

export const StyledDate = ({
  date,
  children,
  ...props
}: { date?: number | null; children?: number | null } & StyledTextProps) => (
  <StyledText {...props}>{useFormatDate(date ?? children ?? null)}</StyledText>
);
