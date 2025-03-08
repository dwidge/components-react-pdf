import { StyledText } from "./StyledText.js";
import { StyledView, StyledViewProps } from "./StyledView.js";

export const Gap = (props: StyledViewProps) => (
  <StyledView {...props}>
    <StyledText> </StyledText>
  </StyledView>
);
