import { StyleSheet, View } from "@react-pdf/renderer";
import { type Style } from "@react-pdf/stylesheet";
import React, { ComponentProps, createContext, useContext } from "react";

type FlagKeysFromRecordKeys<T extends Record<string, any>> = {
  [K in keyof T]?: boolean;
};

export type StyledViewProps<Styles extends ViewStyleSheet = typeof viewStyles> =
  {
    stylesheet?: Styles;
  } & ComponentProps<typeof View> &
    FlagKeysFromRecordKeys<Styles>;

type ViewStyleSheet = Record<string & "default", Style>;

export const StyledView: React.FC<StyledViewProps> = ({
  children,
  style,
  stylesheet = useContext(ViewStyleSheetContext),
  ...props
}) =>
  children && (
    <View
      style={
        [
          stylesheet?.default,
          ...Object.entries(stylesheet ?? {})
            .filter(([k, v]) => props[k as keyof typeof props])
            .map(([k, v]) => v),
          style,
        ] as Style[]
      }
      {...Object.fromEntries(
        Object.entries(props).filter(
          ([k, v]) => !Object.keys(stylesheet ?? {}).includes(k),
        ),
      )}
    >
      {children}
    </View>
  );

export const viewStyles = StyleSheet.create({
  default: {},
  flex: { flex: 1 },
  flex3: { flex: 3 },
  // wrap: { flexWrap: "wrap" }, // check if react-pdf supports flexWrap
  overflowHidden: { overflow: "hidden" }, // check if react-pdf supports overflow: hidden
  rounded: { overflow: "hidden", borderRadius: 8 }, // check borderRadius support
  row: { flexDirection: "row", alignItems: "center" },
  column: { flexDirection: "column" },
  left: { alignItems: "flex-start" },
  center: { alignItems: "center" },
  right: { alignItems: "flex-end" },
  start: { justifyContent: "flex-start" },
  middle: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  space: { justifyContent: "space-between" },
  bgRed: { backgroundColor: "red" },
  bgYellow: { backgroundColor: "yellow" },
  outlineRed: {
    borderWidth: 2, // check borderWidth support
    borderRadius: 8,
    borderColor: "red", // check borderColor support
  },
  underline: {
    borderBottomWidth: 1,
    borderColor: "#888888",
  },
  gap: { gap: 20 }, // check gap support, might need to use margin instead
  sgap: { gap: 10 }, // check gap support
  pad: { padding: 20 },
  hpad: { paddingHorizontal: 20, paddingVertical: 10 },
  nhmargin: { marginHorizontal: -20 },
  nhsmargin: { marginHorizontal: -10 },
  nmargin: { margin: -20 },
  spad: { padding: 10 },
  xspad: { padding: 5 },
  outline: { borderWidth: 1, borderRadius: 8 },
  background: { backgroundColor: "#fff" },
  backgroundAlpha: { backgroundColor: "#fffe" },
  section: { backgroundColor: "#8882" },
  darker: { backgroundColor: "#8882" },
  nest: { backgroundColor: "#8882", padding: 20, marginHorizontal: -20 },
  extend: { paddingHorizontal: 20, marginHorizontal: -20 },
  extends: { paddingHorizontal: 15, marginHorizontal: -15 },
  minWidth: { minWidth: 150, width: "100%" },
  narrow: { maxWidth: 300, width: "100%" },
  wide: { maxWidth: 600, width: "100%" },
  selfcenter: { alignSelf: "center" },
  hidden: { height: 0 },
  mediumSquare: { minWidth: 120, minHeight: 120 },
  card: {
    flex: 1,
    padding: 10,
    gap: 10, // check gap support
    borderWidth: 0.5,
    borderRadius: 8 * 1,
    borderColor: "grey",
  },
  select: {
    backgroundColor: "blue",
    padding: 10,
  },
  unselect: {
    padding: 10,
  },
});

export const ViewStyleSheetContext = createContext(viewStyles);
