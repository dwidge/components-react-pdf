import { createContext, PropsWithChildren, useContext } from "react";
import { StyledText } from "./StyledText";
import { StyledView } from "./StyledView";

export const DebugBlockContext = createContext(false);

export const DebugBlock = ({
  children,
  label = "",
  debug = useContext(DebugBlockContext),
}: PropsWithChildren<{
  label?: string;
  debug?: boolean;
}>) =>
  debug ? (
    <StyledView style={{ borderColor: "violet", borderWidth: 1, margin: 1 }}>
      <StyledText
        style={{ margin: 0, backgroundColor: "violet", color: "white" }}
      >
        {label}
      </StyledText>
      {children}
    </StyledView>
  ) : (
    children
  );
