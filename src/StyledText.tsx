import React, { ComponentProps, PropsWithChildren } from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import { type Style } from "@react-pdf/stylesheet";

type FlagKeysFromRecordKeys<T extends Record<string, any>> = {
  [K in keyof T]?: boolean;
};

export type StyledTextProps<Styles extends TextStyleSheet = typeof textStyles> =
  {
    stylesheet?: Styles;
    numberOfLines?: number;
  } & ComponentProps<typeof Text> &
    FlagKeysFromRecordKeys<Styles>;

type TextStyleSheet = Record<string & "default", Style>;

export const StyledText: React.FC<PropsWithChildren<StyledTextProps>> = ({
  children,
  style,
  stylesheet = textStyles,
  ...props
}) => {
  return children ? (
    <Text
      style={
        [
          stylesheet?.default,
          ...Object.entries(stylesheet ?? {})
            .filter(([k, _v]) => props[k as keyof typeof props])
            .map(([_k, v]) => v),
          style,
        ] as Style[]
      }
      {...Object.fromEntries(
        Object.entries(props).filter(
          ([k, _v]) => !Object.keys(stylesheet ?? {}).includes(k),
        ),
      )}
    >
      {children}
    </Text>
  ) : null;
};

export const textStyles = StyleSheet.create({
  default: {
    fontFamily: "Helvetica", // Example default font
    fontSize: 12, // Example default font size
    color: "black", // Example default color
  },
  primary: {
    color: "black",
    fontSize: 16,
  },
  black: {
    color: "black",
  },
  gray: { color: "gray" },
  white: {
    color: "white",
  },
  link: { color: "blue" },
  error: { color: "red" },
  l: {
    fontSize: 30,
  },
  m: {
    fontSize: 24,
  },
  ms: {
    fontSize: 18,
  },
  s: {
    fontSize: 16,
  },
  xs: {
    fontSize: 14,
  },
  xxs: {
    fontSize: 12,
  },
  left: {
    textAlign: "left",
  },
  center: {
    textAlign: "center",
  },
  right: {
    textAlign: "right",
  },
  bold: {
    fontWeight: "bold",
  },
  xbold: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold", // Example bold font
  },
  underline: { textDecoration: "underline" }, // react-pdf uses textDecoration
  pad: { padding: 14 },
  rounded: {
    borderRadius: 8,
    overflow: "hidden", // react-pdf might not support overflow hidden for Text, check docs
  },
  xrounded: {
    borderRadius: 12,
    overflow: "hidden", // react-pdf might not support overflow hidden for Text, check docs
  },
  chip: {
    padding: 5,
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 8,
    overflow: "hidden", // react-pdf might not support overflow hidden for Text, check docs
  },
  uppercase: { textTransform: "uppercase" },
  tab: {
    marginLeft: 10,
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  flex: { flex: 1 },
  outline: { borderColor: "grey", borderWidth: 1 },
  highlight: { color: "white", backgroundColor: "grey" },
  redBg: { backgroundColor: "red" },
  greenBg: { backgroundColor: "green" },
  orangeBg: { backgroundColor: "orange" },
  colorTab: { color: "black" },
  colorLabel: { color: "blue" },
  colorHint: { color: "green" },
});
