import { Image, Link, View } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { StyledText } from "./StyledText";

export const LinkImage = ({
  id = "",
  link = "",
  uri = null as string | string[] | null,
  name = null as string | null,
  style = undefined as Style | undefined,
  baseIndex = 0,
}) => (
  <Link
    id={id}
    src={link}
    style={
      style ?? {
        flex: "auto",
        display: "flex",
      }
    }
    wrap={false}
  >
    {name ? (
      <StyledText
        style={{
          flexGrow: 0,
          textAlign: "center",
        }}
        s
        minPresenceAhead={1}
      >
        {name}
      </StyledText>
    ) : null}
    <>
      {uri ? (
        <CompositeImage
          uris={Array.isArray(uri) ? uri : [uri]}
          baseIndex={baseIndex}
        />
      ) : null}
    </>
  </Link>
);

const CompositeImage = ({
  uris,
  baseIndex = 0,
}: {
  uris: string[];
  baseIndex?: number;
}) => (
  <div
    style={{
      position: "relative",
    }}
  >
    {uris.map((singleUri, index) => (
      <Image
        key={index}
        style={
          index === baseIndex
            ? { objectFit: "contain" }
            : {
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }
        }
        src={{ uri: singleUri }}
      />
    ))}
  </div>
);
