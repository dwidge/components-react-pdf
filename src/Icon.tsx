import { Image } from "@react-pdf/renderer";

export const Icon: React.FC<{
  src: string;
  style?: Record<string, unknown>;
}> = ({ src, style }) => (
  <Image
    src={src}
    style={{
      width: 25,
      height: 25,
      borderRadius: "50%",
      overflow: "hidden",
      padding: 2,
      ...style,
    }}
  />
);
