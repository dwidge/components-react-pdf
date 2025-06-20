import { Image } from "@react-pdf/renderer";
import { useContext } from "react";
import { ScaleContext } from "./StyledText";

export const Icon: React.FC<{
  src: string;
  style?: Record<string, unknown>;
  scale?: number;
}> = ({ src, style, scale = useContext(ScaleContext) }) => (
  <Image
    src={src}
    style={{
      width: 25 * scale,
      height: 25 * scale,
      borderRadius: "50%",
      overflow: "hidden",
      padding: 2 * scale,
      ...style,
    }}
  />
);
