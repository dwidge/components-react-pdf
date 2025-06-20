import { StyleSheet, Text } from "@react-pdf/renderer";
import { type Style } from "@react-pdf/stylesheet";
import React, {
  ComponentProps,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";

type FlagKeysFromRecordKeys<T extends Record<string, any>> = {
  [K in keyof T]?: boolean;
};

export type StyledTextProps<Styles extends TextStyleSheet = typeof textStyles> =
  {
    stylesheet?: Styles;
    numberOfLines?: number;
    breakWord?: boolean;
    scale?: number;
  } & ComponentProps<typeof Text> &
    FlagKeysFromRecordKeys<Styles>;

type TextStyleSheet = Record<string & "default", Style>;

/**
 * Renders styled and optionally scaled text using a stylesheet and additional props.
 *
 * @param children - The text or elements to display within the component.
 * @param style - Additional style(s) to apply to the text.
 * @param stylesheet - An object containing named style definitions. Defaults to `textStyles`.
 * @param breakWord - If `true`, allows words to break; otherwise, disables hyphenation. Defaults to `false`.
 * @param scale - A scaling factor for the styles, obtained from `ScaleContext` by default.
 * @param props - Additional props, which are filtered to exclude keys present in the stylesheet.
 *
 * @returns A `<Text>` component with the computed styles and props, or `null` if no children are provided.
 */
export const StyledText: React.FC<PropsWithChildren<StyledTextProps>> = ({
  children,
  style,
  stylesheet = textStyles,
  breakWord = false,
  scale = useContext(ScaleContext),
  ...props
}) => {
  const { prop } = groupProps(props, stylesheet);
  const selectedStyles = [
    stylesheet?.default,
    ...Object.entries(stylesheet ?? {})
      .filter(([k, _v]) => props[k as keyof typeof props])
      .map(([_k, v]) => v),
    ...(Array.isArray(style) ? style : [style]),
  ] as Style[];

  const scaledStyles = scaleStyles(selectedStyles, scale);

  return children ? (
    <Text
      hyphenationCallback={breakWord ? undefined : (s) => [s]}
      style={scaledStyles}
      {...Object.fromEntries(prop ?? [])}
      {...props}
    >
      {children}
    </Text>
  ) : null;
};

/**
 * A collection of reusable text styles for PDF rendering using react-pdf.
 *
 * @remarks
 * These styles are intended to be used with the `StyledText` component and can be composed together.
 * The styles cover font families, font sizes, colors, text alignment, font weights, decorations,
 * padding, border radius, background colors, and other common text formatting options.
 *
 * @example
 * ```tsx
 * <Text style={[textStyles.default, textStyles.bold, textStyles.center]}>
 *   Example Text
 * </Text>
 * ```
 *
 * @property default - Base style with Helvetica font, size 12, and black color.
 * @property primary - Larger font size (16) and black color.
 * @property black, gray, white, link, error - Color variations for text.
 * @property l, m, ms, s, xs, xxs - Font size variants (large to extra extra small).
 * @property left, center, right - Text alignment options.
 * @property bold, xbold - Font weight and bold font family.
 * @property underline - Underlined text.
 * @property pad - Padding of 14 units.
 * @property rounded, xrounded - Border radius options for rounded corners.
 * @property chip - Style for chip-like labels.
 * @property uppercase - Uppercase text transformation.
 * @property tab - Style for tab-like elements.
 * @property flex - Flex grow style.
 * @property outline - Outline border style.
 * @property highlight - Highlighted text with white color and grey background.
 * @property redBg, greenBg, orangeBg, cyanBg - Background color variations.
 * @property colorTab, colorLabel, colorHint - Additional color styles for specific use cases.
 *
 * @see {@link https://react-pdf.org/} for more information about styling in react-pdf.
 */
export const textStyles = StyleSheet.create({
  default: {
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "black",
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
    fontFamily: "Helvetica-Bold",
  },
  underline: { textDecoration: "underline" },
  pad: { padding: 14 },
  rounded: {
    borderRadius: 8,
    overflow: "hidden",
  },
  xrounded: {
    borderRadius: 12,
    overflow: "hidden",
  },
  chip: {
    padding: 5,
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 8,
    overflow: "hidden",
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
  cyanBg: { backgroundColor: "cyan" },
  colorTab: { color: "black" },
  colorLabel: { color: "blue" },
  colorHint: { color: "green" },
});

export const ScaleContext = createContext<number>(1);

const SCALABLE_PROPS = [
  "fontSize",
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "lineHeight",
] as const;

type ScalableProp = (typeof SCALABLE_PROPS)[number];

function scaleStyle<T extends Record<string, any>>(style: T, scale: number): T {
  if (!style || typeof style !== "object") return style;
  const scaled: Record<string, any> = { ...style };
  for (const prop of SCALABLE_PROPS) {
    if (typeof style[prop] === "number") {
      scaled[prop] = style[prop] * scale;
    }
  }
  return scaled as T;
}

function scaleStyles<T extends Style | Style[] | undefined>(
  styles: T,
  scale: number,
): T {
  if (!styles) return styles;
  if (Array.isArray(styles)) {
    return styles.map((s) => scaleStyle(s, scale)) as T;
  }
  return scaleStyle(styles, scale) as T;
}

interface Props {
  [key: string]: unknown;
}

interface StyleSheetRecord {
  [key: string]: Style;
}

const groupProps = (props: Props, stylesheet?: StyleSheetRecord) =>
  Object.groupBy(Object.entries(props), propType(stylesheet));

const propType =
  (stylesheet?: StyleSheetRecord) =>
  ([k, _v]: [string, unknown], index: number): "style" | "prop" =>
    Object.keys(stylesheet ?? {}).includes(k) ? "style" : "prop";
