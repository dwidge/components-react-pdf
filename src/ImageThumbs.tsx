import { Image } from "@react-pdf/renderer";
import React from "react";
import { StyledText } from "./StyledText.js";
import { StyledView, StyledViewProps } from "./StyledView.js";

export const ImageThumbs = ({
  images,
  size,
  ...props
}: StyledViewProps & {
  size?: number;
  images: readonly { uri?: string }[];
}): React.ReactElement | null => (
  <StyledView row sgap wrap {...props}>
    {images
      .slice(0, 3)
      ?.map(({ uri }, i) =>
        uri ? (
          <Image key={i} source={{ uri }} style={{ width: size }} />
        ) : (
          <PlaceHolder key={i} />
        ),
      )}
  </StyledView>
);

const PlaceHolder = () => <StyledText>Missing</StyledText>;
